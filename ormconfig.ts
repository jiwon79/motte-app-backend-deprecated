import { ConnectionOptions } from 'typeorm';

const typeormConfig: ConnectionOptions =
  process.env.ENVIROMENT === 'develop'
    ? {
        type: 'postgres',
        database: 'github-actions-motte-app',
        username: 'postgres',
        password: 'postgres',
        port: 5432,
        synchronize: false,
        logging: true,
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        migrations: [__dirname + '/src/migrations/*.{ts,js}'],
        cli: {
          entitiesDir: __dirname + '/**/*.entity.{ts,js}',
          migrationsDir: 'src/migrations',
        },
        ssl: false,
      }
    : {
        url: process.env.DATABASE_URL,
        type: 'postgres',
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/src/migrations/*.{ts,js}'],
        migrationsTableName: 'migrations',
        cli: {
          entitiesDir: __dirname + '/**/*.entity.{js,ts}',
          migrationsDir: 'src/migrations/',
        },
      };

export = typeormConfig;
