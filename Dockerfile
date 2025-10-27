FROM node:22-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
ENV DATABASE_URL=file:local.db
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-bullseye-slim
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
COPY drizzle.config.ts .
COPY drizzle ./drizzle
ENV DATABASE_URL=file:local.db
EXPOSE 3000
ENV NODE_ENV=production
CMD ["sh","-c","npm run db:migrate && node build"]