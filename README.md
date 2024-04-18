# Feedback API

Simple API to manage post-event feedback built with elyisa, postgres and drizzle-orm.

## Development Setup

### Fork and clone the repository

- [Fork](https://github.com/mhmdsami/feedback-api) the repository

```bash
git clone https://github.com/<username>/feedback-api
```

> [!NOTE]  
> This project uses the [bun](https://bun.sh/) runtime, make sure to have it installed before continuing

### Install the dependencies

```bash
bun install
```

### Setup the environment variables

- Create a `.env.local` file in the root directory (see `.env.example` for an example)

> [!TIP]
> If you don't have a postgres instance running, you can start the db service using docker compose
>
> ```
> docker compose up -d db
> ```

### Run the migrations

```bash
bun run db:migrate
```

### Start the development server

```bash
bun run dev
```

## Deployment

The repo provides [`start-service.sh`](./scripts/start-service.sh) to automate the process of installing docker and starting the service

```bash
chmod +x ./scripts/start-service.sh # make the script executable

./scripts/start-service.sh
```

> [!NOTE]  
> Alternatively if you have `docker compose` installed already, just start the services
>
> ```bash
> docker compose up
> ```

### Setting up `nginx`

```
chmod +x ./scripts/setup-nginx.sh

./scripts/setup-nginx.sh
```

## Tech Stack

- [Bun](https://bun.sh/)
- [Elysia](https://elysiajs.com/)
- [drizzle](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://github.com/features/actions)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx](https://www.nginx.com/)
