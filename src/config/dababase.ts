export const databaseConfig = () => ({
  database: {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'postgres',
    port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
    username: process.env.TYPEORM_USER || 'auth-test',
    password: process.env.TYPEORM_PASSWORD || 'test',
    database: process.env.TYPEORM_DATABASE || 'auth-db',
    entities: ['**/*.entity.ts'],
    migrations: ['migrations/**/*.ts'],
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  },
});
