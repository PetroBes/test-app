## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ docker-compose up
```

## Create migration

We can create all migrations automatically.

Example:

```bash
# Enter the docker container:
$ docker-compose exec api-service sh

# Generate migration file:
$ npm run typeorm migration:generate ./src/migrations/migration_name

# Run migration:
$ npm run typeorm migration:run

#Revert one migration:
$ npm run typeorm migration:revert
```

## Use format prettier to stick the project convention rules

Before the commiting changes use:

```bash
$ npm run format
```

## Backend .env file

### example of all variables with default values

Use these for the development:

```
TYPEORM_HOST=postgres
TYPEORM_PORT=5432
TYPEORM_USER=auth-test
TYPEORM_PASSWORD=test
TYPEORM_DATABASE=auth-db
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true

JWT_SECRET=cOpATK4ylbEN2CmSvpNX4tvW3lGVeLLpjtJXGCduxGpuWpcyf3uPxsQhItzmzb9Npr2kFjCJjrhiTKpwzbt9H0KUsfcHhFR1BxT
JWT_EXPIRATION=3600
```
