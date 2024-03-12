import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'auth-test',
  password: 'test',
  database: 'auth-db',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
});
