# Stage 1: Build frontend with pnpm workspace
FROM node:22-slim AS build
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# Workspace config (layer cache)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.base.json ./
COPY .npmrc ./

# All package.json files (preserve workspace structure)
COPY artifacts/mbox/package.json artifacts/mbox/package.json
COPY artifacts/api-server/package.json artifacts/api-server/package.json
COPY lib/db/package.json lib/db/package.json
COPY lib/api-zod/package.json lib/api-zod/package.json
COPY lib/api-client-react/package.json lib/api-client-react/package.json
COPY lib/api-spec/package.json lib/api-spec/package.json
COPY scripts/package.json scripts/package.json

RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN PORT=3000 BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/mbox run build \
 && pnpm --filter @workspace/scripts exec tsx /app/artifacts/mbox/scripts/build-seo.mjs

# Stage 2: Serve with nginx
FROM nginx:alpine AS production
COPY nginx.container.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/artifacts/mbox/dist/public /usr/share/nginx/html
EXPOSE 80
