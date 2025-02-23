# 🏗️ Etapa 1: Construção da Aplicação
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos essenciais antes de instalar dependências
COPY package.json package-lock.json ./

# Instalar dependências de produção
RUN npm ci

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm install -g typescript && tsc

# 🏗️ Etapa 2: Criar a imagem final com um ambiente leve
FROM node:18-alpine

WORKDIR /app

# Copiar apenas os arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

# Definir variáveis de ambiente (podem ser sobrescritas no runtime)
ENV NODE_ENV=production
ENV PORT=40000

# Expor a porta correta da aplicação
EXPOSE 40000

# Rodar migrações do Prisma antes de iniciar o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
