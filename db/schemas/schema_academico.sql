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
CREATE TABLE academico.registro_presenca (
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
CREATE INDEX idx_presenca_disciplina_id ON academico.registro_presenca(disciplina_id);

-- =================================================
-- Criação de TRIGGERS
-- =================================================
CREATE FUNCTION IF NOT EXISTS 