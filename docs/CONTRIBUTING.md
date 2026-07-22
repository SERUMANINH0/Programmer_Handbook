# Como contribuir com conteúdo

Este projeto separa completamente **arquitetura** (app, componentes, busca, testes) de
**conteúdo** (os arquivos JSON em `data/`). Este guia é sobre a segunda parte: como
preencher categorias com qualidade e consistência de schema.

## Antes de começar

- Cada item segue exatamente o formato descrito em `types/entry.ts` e validado por
  `lib/validation/entry.schema.ts`. Rode `npm run validate:data` sempre que editar um JSON.
- `id` precisa ser único **em todo o projeto**, não apenas no arquivo — prefixe com o nome
  da categoria (ex: `git-rebase-interactive`, `docker-multi-stage-build`).
- Links em `officialDocumentation`/`externalReferences` devem apontar **somente** para
  documentação oficial (ou fontes de altíssima confiabilidade, ex: MDN para o próprio W3C/WHATWG).
- Prefira qualidade a quantidade: descrições curtas e corretas, exemplos que realmente rodam,
  boas práticas e erros comuns que só quem usa a ferramenta no dia a dia saberia.

## O prompt padrão por categoria

Use (e adapte) o prompt abaixo para preencher **um arquivo JSON por vez**. Ele foi desenhado
para produzir o máximo de cobertura técnica mantendo o padrão de schema do projeto.

```
Preencha apenas <arquivo>.json.

Objetivo:
Criar a referência mais completa possível sobre <assunto>.

Inclua:
- comandos/conceitos básicos
- intermediários
- avançados
- aliases
- flags
- parâmetros
- exemplos reais
- explicações curtas
- boas práticas
- erros comuns
- casos de uso
- troubleshooting
- (quando fizer sentido para o assunto: workflows, recuperação de erros, configuração,
  segurança, integração com outras ferramentas)

Utilize exatamente o padrão JSON do projeto (types/entry.ts / lib/validation/entry.schema.ts).

Adicione links apenas para documentação oficial.

Gere o máximo de registros possível mantendo alta qualidade.
```

### Exemplo já usado neste projeto (git.json)

```
Preencha apenas git.json.

Objetivo:
Criar a referência mais completa possível sobre Git.

Inclua:
- comandos básicos
- intermediários
- avançados
- aliases
- flags
- parâmetros
- exemplos reais
- explicações curtas
- boas práticas
- erros comuns
- casos de uso
- workflows
- Git Flow
- GitHub Flow
- Conventional Commits
- recuperação de commits
- recuperação de branches
- reflog
- stash
- cherry-pick
- rebase
- merge
- bisect
- submodules
- worktree
- hooks
- configuração
- SSH
- HTTPS
- tags
- releases
- troubleshooting

Utilize exatamente o padrão JSON do projeto.

Adicionar links apenas para documentação oficial do Git.

Gerar o máximo de registros possível mantendo alta qualidade.
```

Repita a mesma ideia trocando o assunto: `powershell.json`, `linux.json`, `postgresql.json`,
`docker.json`, `javascript.json`, `kubernetes.json`, etc.

## Checklist antes de abrir um PR de conteúdo

- [ ] `npm run validate:data` passa sem erros.
- [ ] Nenhum `id` duplicado (o script de validação também checa isso).
- [ ] Todo item tem `id`, `category`, `title`, `description`, `difficulty` e `updatedAt`.
- [ ] Links de documentação são oficiais.
- [ ] `npm run test` continua verde (o schema é testado contra todos os JSONs em
      `lib/validation/entry.schema.test.ts`).

## Criando uma categoria em um grupo que ainda não existe

Veja a seção "Como criar um novo grupo" no [README](../README.md#como-criar-um-novo-grupo).
