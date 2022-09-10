import { DataSource } from 'typeorm';
import { typeOrmConfig } from './ormconfig';

export const dataSource = new DataSource(typeOrmConfig);
