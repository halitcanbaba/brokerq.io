# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### MetaTrader Solutions (`artifacts/mbox`) — Preview path: `/`
A professional B2B landing page for an FX broker MetaTrader plugin/services company.
- **Stack**: React + Vite + TypeScript + Tailwind CSS v4
- **Key packages**: @tsparticles/react, @tsparticles/slim, framer-motion, lucide-react
- **Design**: Dark theme (#0a0a1a bg, #00d4aa teal accent, #0ea5e9 blue accent), animated particle network background, NVIDIA-inspired layout
- **Sections**: Navbar, Hero (with search), Products Grid (7 products, category filters), Features, CTA, Footer

### API Server (`artifacts/api-server`) — Preview path: `/api`
Shared Express 5 backend for all artifacts.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/mbox run dev` — run the MetaTrader site locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
