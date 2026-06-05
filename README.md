# SENAC Lab 4 — Projeto Final

Repositório do projeto final do grupo. Este documento explica **como colaborar sem quebrar nada**.

> **Leia antes de dar o primeiro `push`.** Temos um fluxo de branches obrigatório.
> A branch `main` é protegida: **ninguém faz push direto nela**, apenas o administrador
> (responsável pelo repositório) faz o merge final.

---

## Fluxo de trabalho (resumo visual)

```
feature/minha-etapa  ─┐
feature/outra-etapa  ─┼──►  testes  ──►  main
feature/mais-uma     ─┘     (integração)  (só o admin faz merge)
```

1. Você cria uma branch própria para cada etapa/tarefa, a partir de `testes`.
2. Termina a tarefa e faz o merge da sua branch **em `testes`**.
3. O administrador, periodicamente, faz o merge de `testes` **em `main`**.

Você **nunca** dá push direto em `main` (a Ruleset do GitHub vai recusar).

---

## 1. Clonar o repositório (só na primeira vez)

```bash
git clone https://github.com/SENAC-Lab4/senac-lab4-projeto-final.git
cd senac-lab4-projeto-final
```

Configure seu nome e e-mail (uma vez por máquina), se ainda não fez:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

---

## 2. Ver todas as branches e baixar a `testes`

Liste as branches locais e remotas:

```bash
git branch -a
```

Você verá algo como `remotes/origin/testes`. Para entrar nela:

```bash
git checkout testes
```

> Em versões recentes do Git, esse comando já cria a branch local `testes`
> rastreando a `origin/testes` automaticamente. Se der erro, use:
> `git checkout -b testes origin/testes`

Confirme que está na branch certa:

```bash
git branch        # a branch atual aparece com um * na frente
```

---

## 3. Criar sua branch para a etapa

**Sempre parta da `testes` atualizada.** Antes de criar a sua branch:

```bash
git checkout testes
git pull origin testes
```

Agora crie a branch da sua etapa. Use um nome descritivo com prefixo `feature/`:

```bash
git checkout -b feature/modelagem-visualizacoes
```

Exemplos de nomes bons:

- `feature/tabela-usuarios`
- `feature/trigger-revisoes`
- `feature/tela-login`
- `fix/corrige-foreign-key`

---

## 4. Trabalhar e enviar sua branch

Faça suas alterações e vá salvando com commits:

```bash
git add .
git commit -m "Descreve o que foi feito nessa etapa"
```

Envie sua branch para o GitHub (a primeira vez usa `-u`):

```bash
git push -u origin feature/modelagem-visualizacoes
```

Nos próximos pushes da mesma branch, basta:

```bash
git push
```

---

## 5. Levar seu trabalho para a `testes`

Quando a etapa estiver pronta, integre na `testes`. **Recomendado: via Pull Request**
(deixa registrado e permite revisão dos colegas):

1. No GitHub, abra um **Pull Request** com base em `testes` e comparando com a sua branch.
2. Peça revisão de um colega, se combinado.
3. Faça o **merge** do PR (destino `testes`).

Como `testes` **não** é protegida, qualquer membro com permissão de *Write* pode fazer
esse merge.

> **Alternativa pela linha de comando** (se preferir não usar PR):
> ```bash
> git checkout testes
> git pull origin testes
> git merge feature/modelagem-visualizacoes
> git push origin testes
> ```

---

## 6. Mantenha sua branch atualizada com a `testes`

Outros colegas também estão mandando coisas para `testes`. Para evitar conflitos grandes,
atualize sua branch de vez em quando:

```bash
git checkout feature/minha-etapa
git pull origin testes        # traz o que os colegas já integraram
# resolva conflitos, se houver, e faça commit
```

---

## 7. Merge final em `main` (apenas o administrador)

A `main` está protegida por uma **Ruleset** do GitHub com:

- **Restrict updates** — só quem está na *bypass list* (o administrador) pode dar push/merge.
- **Restrict deletions** — ninguém apaga a branch.
- **Block force pushes** — push forçado bloqueado.

Por isso, **só o administrador** faz o merge de `testes` em `main`, depois de validar que
está tudo funcionando. Se você tentar dar push em `main`, o GitHub vai recusar — isso é
esperado, não é um erro seu.

---

## Resumo dos comandos do dia a dia

```bash
# começar uma etapa nova
git checkout testes
git pull origin testes
git checkout -b feature/nome-da-etapa

# durante o trabalho
git add .
git commit -m "mensagem"
git push -u origin feature/nome-da-etapa   # primeira vez
git push                                    # próximas vezes

# integrar na testes (de preferência via Pull Request no GitHub)
```

## Regras de ouro

- ❌ **Nunca** dê push direto em `main`.
- ✅ Cada etapa em sua **própria branch** `feature/...`.
- ✅ Sempre parta da `testes` **atualizada** (`git pull origin testes`).
- ✅ Integre seu trabalho em `testes` (de preferência por Pull Request).
- ✅ O merge final em `main` é **sempre** feito pelo administrador.
