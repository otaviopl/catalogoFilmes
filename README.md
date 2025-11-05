# PW2 Movies (Next.js + Axios + MockAPI)

Aplicação Next.js (App Router) com CRUD de filmes consumindo uma API MockAPI.io.

## Requisitos
- Node 18.17+ (recomendado 20+)
- pnpm

## Setup
1. Instalação:

```bash
pnpm install
```

2. Configuração da API:
- Crie uma coleção em `MockAPI.io` (ex.: `movies`).
- Copie a URL da coleção (ex.: `https://SEU_PROJETO.mockapi.io/api/v1/movies`).
- Crie um arquivo `.env.local` na raiz com:

```bash
NEXT_PUBLIC_API_BASE_URL=https://SEU_PROJETO.mockapi.io/api/v1/movies
```

3. Executar em dev:

```bash
pnpm dev
```

Acesse `http://localhost:3000`.

## Estrutura
- `app/` (App Router)
  - `page.js` (listagem + excluir)
  - `movies/new/page.js` (criar)
  - `movies/[id]/page.js` (detalhes)
  - `movies/[id]/edit/page.js` (editar)
- `services/`
  - `api.js` (Axios instância com baseURL do `.env.local`)
  - `movies.js` (operações CRUD)

## Notas
- O valor de `NEXT_PUBLIC_API_BASE_URL` deve apontar DIRETAMENTE para a coleção (terminando em `/movies`).
- Campos usados: `title`, `genre`, `year`, `director`. O MockAPI aceita campos livres.


