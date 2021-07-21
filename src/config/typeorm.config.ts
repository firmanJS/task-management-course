import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
