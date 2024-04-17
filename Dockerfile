FROM oven/bun

WORKDIR /app

COPY . .

ENV NODE_ENV production
ENV PORT ${PORT:-3000}
ENV DATABASE_URL ${DATABASE_URL}

RUN bun install --production

CMD bun db:migrate && bun src/index.ts

EXPOSE 3000
