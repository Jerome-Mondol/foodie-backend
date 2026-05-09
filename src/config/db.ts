import { PrismaClient } from '../../generated/prisma/client.js';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import config from './index.js';

dotenv.config();

const pool = new pg.Pool({ connectionString: config.database_url });
const adapter = new PrismaPg(pool);

// Exporting a single instance of Prisma
export const prisma = new PrismaClient({ adapter });