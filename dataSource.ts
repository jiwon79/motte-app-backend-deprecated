import { DataSource } from 'typeorm';
import { typeormConfig } from './ormconfig';

export const dataSource = new DataSource(typeormConfig);
