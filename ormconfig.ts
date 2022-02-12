import { ConnectionOptions } from 'typeorm';

const typeormConfig: ConnectionOptions = process.env.NODE_ENV
  ? {
      url: process.env.DATABASE_URL,
      name: 'production',
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
    }
  : {
      name: 'local',
      type: 'sqlite',
      database: 'db',
      synchronize: false,
      logging: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      migrations: [__dirname + '/src/migrations/*.{ts,js}'],
      cli: {
        entitiesDir: __dirname + '/**/*.entity.{ts,js}',
        migrationsDir: 'src/migrations',
      },
    };

export = typeormConfig;
