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

    CONSTRAINT nota_intervalo CHECK (nota >= 0 AND nota <0 10),
    CONSTRAINT peso_positivo CHECK (peso > 0),
    CONSTRAINT bimestre_valido CHECK (bimestre IS NULL OR bimestre IN (1,2)),

);