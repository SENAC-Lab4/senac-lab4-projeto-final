# Como a sua média e frequência são calculadas

Este artigo explica, de forma resumida, **como a sua situação acadêmica é calculada**
no FACSENAC-DF e como acompanhá-la pelo Guia Estudantil Digital. As regras valem para
*todas as disciplinas* do curso de Análise e Desenvolvimento de Sistemas.

> **Atenção:** os valores exibidos no app são uma estimativa para sua organização
> pessoal e **não substituem** os registros oficiais da Secretaria Acadêmica.

## Composição da nota

Cada professor compõe a nota do bimestre livremente, distribuindo **10 pontos** entre as
atividades. No segundo bimestre, dois componentes são fixos:

- **Prova Integradora** — vale `2` pontos.
- **Jornada Interdisciplinar** — vale `1` ponto.
- Os `7` pontos restantes ficam a critério do professor (provas, trabalhos, listas).

A média do bimestre é a **soma ponderada** das atividades:

```text
média_bimestre = Σ(nota × peso) / Σ(peso)
```

Por exemplo, com três atividades:

| Atividade        | Peso | Nota |
|------------------|:----:|:----:|
| Lista de Tarefas |   2  |  8,0 |
| Prova            |   5  |  6,0 |
| Trabalho         |   3  | 10,0 |

O cálculo fica `(8×2 + 6×5 + 10×3) / (2+5+3) = 76 / 10 = `**`7,6`**.

## Situação final

A média final é `(média_b1 + média_b2) / 2`. A partir dela, a sua situação é:

1. **Aprovado** — média final maior ou igual a 6.
2. **Recuperação** — média entre 2 e 6 (você ainda pode ser aprovado).
3. **Reprovado** — média abaixo de 2 (sem direito a recuperação).

Na recuperação, você é aprovado se `(média_semestre + nota_recuperação) / 2 ≥ 6`.

## Frequência mínima

A presença mínima exigida é de **75%** do total de aulas planejadas:

- [x] Presença `≥ 80%` → tranquilo, situação **Aprovado**.
- [ ] Presença entre `75%` e `80%` → atenção, situação **Em risco**.
- [ ] Presença `< 75%` → situação **Reprovado** por falta.

---

Veja também o artigo [Calendário Acadêmico](/artigos/calendario-academico) e a
[página oficial do FACSENAC-DF](https://df.senac.br/) para datas e prazos.

![Gráfico ilustrativo de frequência](https://df.senac.br/exemplo-grafico-frequencia.png)

<!--
==========================================================================
SEÇÃO DE TESTE DE SANITIZAÇÃO — NÃO COPIE PARA ARTIGOS REAIS
Os trechos abaixo são vetores de XSS propositais. Com o pipeline correto
(markdown-it com html:false + DOMPurify), NADA aqui deve executar:
o conteúdo deve aparecer como texto inofensivo ou ser removido.
==========================================================================
-->

## Teste de sanitização (não usar em artigos reais)

Estes exemplos servem **apenas** para validar a renderização segura. Se algum deles
disparar um alerta no navegador, a sanitização está falhando.

- Script embutido: <script>alert('XSS via script')</script>
- Imagem com handler: <img src="x" onerror="alert('XSS via onerror')">
- Link com esquema perigoso: [clique aqui](javascript:alert('XSS via href'))
- HTML cru no meio do texto: <b onmouseover="alert('XSS')">passe o mouse aqui</b>

Resultado esperado: o `<script>` é removido, o `onerror`/`onmouseover` é descartado,
e o link `javascript:` é neutralizado (vira link inerte ou texto).
