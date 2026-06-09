-- ===========================================
-- BANCO DE DADOS DOS REQUISITOS ACADÊMICOS
-- ===========================================

CREATE SCHEMA IF NOT EXISTS academico;

-- Tipos de avaliações
CREATE TYPE academico.tipo_avaliacao AS ENUM (
    'bimestral',
    'prova_integradora',
    'jornada',
    'recuperacao'
);

-- ================================================================
-- Tabelas que compõe o schema academico
-- ================================================================
-- Tabela que armazena as disciplinas matriculadas
CREATE TABLE academico.disciplinas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    periodo_letivo TEXT,
    total_aulas SMALLINT NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT total_aulas_positivo CHECK (total_aulas > 0)
);

-- Tabela que armazena as avaliações
CREATE TABLE academico.avaliacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disciplina_id UUID NOT NULL REFERENCES academico.disciplinas(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    tipo academico.tipo_avaliacao NOT NULL DEFAULT 'bimestral',
    bimestre SMALLINT,
    nota NUMERIC(4,2) NOT NULL,
    peso NUMERIC (4,2) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT nota_intervalo CHECK (nota >= 0 AND nota <= 10),
    CONSTRAINT peso_positivo CHECK (peso > 0),
    CONSTRAINT bimestre_valido CHECK (bimestre IS NULL OR bimestre IN (1,2)),
    -- Toda avaliação exige bimestre, menos avaliação de recuperação
    CONSTRAINT exige_bimestre
        CHECK (tipo = 'recuperacao' OR bimestre IS NOT NULL),
    -- Restrição da prova integradora que é no segundo bimestre e vale até 2 pontos
    CONSTRAINT prova_integradora_regras
        CHECK (tipo <> 'prova_integradora' OR (bimestre = 2 AND peso = 2)),
    -- Restrição da jornada interdisciplinar no segundo bimestre e vale 1 ponto
    CONSTRAINT jornada_regras
        CHECK (tipo <> 'jornada' OR (bimestre = 2 AND peso = 1))
);

-- Tabela com registro de presença
CREATE TABLE academico.registros_presenca (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disciplina_id UUID NOT NULL REFERENCES academico.disciplinas(id) ON DELETE CASCADE,
    "data" DATE NOT NULL DEFAULT current_date,
    presente BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),

    UNIQUE (disciplina_id, "data")
);

-- =================================================
-- Índices 
-- =================================================
CREATE INDEX idx_disciplinas_aluno_id ON academico.disciplinas(aluno_id);
CREATE INDEX idx_avaliacos_disciplina_id ON academico.avaliacoes(disciplina_id);
CREATE INDEX idx_presenca_disciplina_id ON academico.registros_presenca(disciplina_id);

-- =================================================
-- Funções de cálculos da média do aluno e da presença
-- =================================================

-- Média do bimestre é a soma ponderada dos componentes do bimestre 
CREATE OR REPLACE FUNCTION academico.media_bimestre(p_disciplina UUID, p_bimestre SMALLINT)
RETURNS NUMERIC
LANGUAGE sql STABLE
AS $$
    SELECT CASE WHEN SUM(peso) > 0
        THEN ROUND(SUM(nota * peso) / SUM(peso), 2)
        ELSE NULL END
    FROM academico.avaliacoes
    WHERE disciplina_id = p_disciplina
      AND tipo IN ('bimestral', 'prova_integradora', 'jornada')
      AND bimestre = p_bimestre;
$$;

-- Última nota de recuperação lançada
CREATE OR REPLACE FUNCTION academico.nota_recuperacao(p_disciplina UUID)
RETURNS NUMERIC
LANGUAGE sql STABLE
AS $$
    SELECT nota
    FROM academico.avaliacoes
    WHERE disciplina_id = p_disciplina
      AND tipo = 'recuperacao'
    ORDER BY criado_em DESC
    LIMIT 1;
$$;

-- Média final do semestre, considerando recuperaçãoq aundo aplicável
CREATE OR REPLACE FUNCTION academico.media_final(p_disciplina UUID)
RETURNS NUMERIC
LANGUAGE plpgsql STABLE
AS $$
DECLARE
    v_b1 NUMERIC := academico.media_bimestre(p_disciplina, 1);
    v_b2 NUMERIC := academico.media_bimestre(p_disciplina, 2);
    v_parcial NUMERIC;
    v_rec NUMERIC;
BEGIN
    IF v_b1 IS NULL OR v_b2 IS NULL THEN
        RETURN NULL; -- ainda não há notas dos dois bimestres
    END IF;
    v_parcial := ROUND((v_b1 + v_b2) / 2, 2);
    -- parovado direto (>=6) ou reprovado direito (<2)
    IF v_parcial >= 6 OR v_parcial < 2 THEN
        RETURN v_parcial;
    END IF;
    -- recuperação (2 <= média < 6)
    v_rec := academico.nota_recuperacao(p_disciplina);
    IF v_rec IS NULL THEN
        RETURN v_parcial;   -- aluno está de recuperação, mas ainda não tem nota
    END IF;
    RETURN ROUND((v_parcial + v_rec) / 2, 2);
END;
$$;

-- Função que informa situação do aluno de acordo com a média
-- <2 Reprovado | 2..<6 Recupração | >= Aprovado
CREATE OR REPLACE FUNCTION academico.situacao_media(p_disciplina UUID)
RETURNS TEXT
LANGUAGE plpgsql STABLE
AS $$
DECLARE
    v_b1 NUMERIC := academico.media_bimestre(p_disciplina, 1);
    v_b2 NUMERIC := academico.media_bimestre(p_disciplina, 2);
    v_parcial NUMERIC;
    v_rec NUMERIC;
BEGIN
    IF v_b1 IS NULL OR v_b2 IS NULL THEN
        RETURN 'Em curso';
    END IF;
    v_parcial := (v_b1 + v_b2) / 2;
    IF v_parcial >= 6 THEN
        RETURN 'Aprovado';
    ELSIF v_parcial < 2 THEN
        RETURN 'Reprovado';
    END IF;
    -- recuperação
    v_rec := academico.nota_recuperacao(p_disciplina);
    IF v_rec IS NULL THEN
        RETURN 'Recuperação';    -- ainda está sem nota de recuperação
    END IF;
    -- Foi aprovado com a nota da recuperação
    IF (v_parcial + v_rec) / 2 >= 6 THEN
        RETURN 'Aprovado';
    ELSE
        RETURN 'Reprovado';
    END IF;
END;
$$;

-- Situação da frequência (mínima de 75% de presença)
CREATE OR REPLACE FUNCTION academico.situacao_frequencia(p_disciplina UUID)
RETURNS TEXT
LANGUAGE plpgsql STABLE
AS $$
DECLARE
    v_total INT;
    v_faltas INT;
    v_pct_faltas NUMERIC;
BEGIN
    SELECT total_aulas INTO v_total
    FROM academico.disciplinas WHERE id = p_disciplina;
    IF v_total IS NULL OR v_total = 0 THEN
        RETURN 'Em curso';
    END IF;
    SELECT COUNT(*) INTO v_faltas
    FROM academico.registros_presenca
    WHERE disciplina_id = p_disciplina AND presente = false;
    v_pct_faltas := (v_faltas::NUMERIC / v_total) * 100;
    IF v_pct_faltas > 25 THEN
        RETURN 'Reprovado';
    ELSIF v_pct_faltas >= 20 THEN
        RETURN 'Em risco';
    ELSE
        RETURN 'Aprovado';
    END IF;
END;
$$;

-- =================================================
-- VIEW DE RESUMO
-- =================================================
CREATE VIEW academico.vw_disciplina_resumo AS
SELECT
    d.id,
    d.aluno_id,
    d.nome,
    d.periodo_letivo,
    d.total_aulas,
    academico.media_bimestre(d.id, 1::SMALLINT) AS media_b1,
    academico.media_bimestre(d.id, 2::SMALLINT) AS media_b2,
    academico.media_final(d.id) AS media_final,
    academico.situacao_media(d.id) AS situacao_media,
    (SELECT COUNT(*) FROM academico.registros_presenca p
        WHERE p.disciplina_id = d.id AND p.presente = false) AS faltas,
    (SELECT COUNT(*) FROM academico.registros_presenca p
        WHERE p.disciplina_id = d.id) AS aulas_registradas,
    academico.situacao_frequencia(d.id) AS situacao_frequencia
FROM academico.disciplinas d;

-- ================================================
-- RLS - cada aluno acessa apenas seus próprios dados
-- ================================================
ALTER TABLE academico.disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE academico.avaliacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE academico.registros_presenca ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Aluno gerencia as próprias disciplinas"
    ON academico.disciplinas FOR ALL
    USING (aluno_id = auth.uid())
    WITH CHECK (aluno_id = auth.uid());

CREATE POLICY "Aluno gerencia as próprias avaliações"
    ON academico.avaliacoes FOR ALL
    USING (EXISTS (
        SELECT 1 FROM academico.disciplinas d
        WHERE d.id = avaliacoes.disciplina_id AND d.aluno_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM academico.disciplinas d
        WHERE d.id = avaliacoes.disciplina_id AND d.aluno_id = auth.uid()
    ));

CREATE POLICY "Aluno gerencia os próprios registros de presença"
    ON academico.registros_presenca FOR ALL
    USING (EXISTS (
        SELECT 1 FROM academico.disciplinas d
        WHERE d.id = registros_presenca.disciplina_id AND d.aluno_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM academico.disciplinas d
        WHERE d.id = registros_presenca.disciplina_id AND d.aluno_id = auth.uid()
    ));

-- ================================================
-- TRIGGERS
-- ================================================
CREATE TRIGGER trg_disciplinas_atualizado_em
    BEFORE UPDATE ON academico.disciplinas
    FOR EACH ROW
    EXECUTE FUNCTION set_atualizado_em();

CREATE TRIGGER trg_avaliacoes_atualizado_em
    BEFORE UPDATE ON academico.avaliacoes
    FOR EACH ROW
    EXECUTE FUNCTION set_atualizado_em();