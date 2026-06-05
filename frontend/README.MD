# Guia do Aluno Digital — FACSENAC DF

Aplicativo mobile do Guia do Aluno Digital da FACSENAC DF, desenvolvido por Daniel Ferreira, Filipe Peres, Gabriel Republicano e Gabriel Oliveira.

## O problema

A faculdade utiliza um guia impresso estático, de difícil atualização e busca lenta. Informações sobre regras, contatos e procedimentos acadêmicos estão dispersas, o que sobrecarrega a secretaria com dúvidas simples e deixa alunos sem respostas rápidas. Além disso, não existe uma ferramenta centralizada para o aluno acompanhar presença e médias de forma prática — o SIG e o Moodle são considerados imprecisos e confusos.

## A solução

Um aplicativo mobile que centraliza tudo em um só lugar: documentação navegável, calculadoras de apoio acadêmico e registro pessoal de presença. O foco é colocar a informação correta na palma da mão do aluno, 24/7.

## Funcionalidades do escopo

| Módulo | Descrição |
|---|---|
| **Documentação Digital** | Busca rápida por termos, FAQs e guias de procedimentos da faculdade |
| **Calculadora de Médias** | Simulador de notas para o 1º e 2º bimestre, com cálculo automático da nota necessária na recuperação |
| **Módulo de Presença** | Registro manual de faltas e presenças para acompanhar o limite de 25% |
| **Avaliação dos Artigos** | Captação de aprovação dos artigos pelos usuários |
| **Publicação de Artigos** | Plataforma de escrita de artigos para usuários administradores |

> O app **não substitui** o Moodle nem o registro oficial de notas e faltas dos professores. O controle de presença é consultivo e pessoal.

## Stack tecnológica

| Camada | Tecnologia |
|---|---|
| **App mobile** | React Native com Expo |
| **Linguagem** | TypeScript |
| **Backend/API** | FastAPI (Python) — já implementado em `../backend/` |
| **Banco de dados** | PostgreSQL via Supabase |
| **Autenticação** | Supabase Auth (JWT) |

O backend expõe uma API REST completa em `http://localhost:8000` (docs em `/docs`). O frontend consome essa API para tudo relacionado a artigos, categorias e seções. A autenticação é feita diretamente com o Supabase usando o SDK oficial para React Native (`@supabase/supabase-js`).

## Estrutura de usuários

- **Estudante** — lê artigos, usa calculadoras e registra presença
- **Professor** — acesso à leitura (mesma visão do estudante na v1.0)
- **Admin** — publica e gerencia artigos pelo app