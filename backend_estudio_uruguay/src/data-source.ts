import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/common/User'
import dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
})
