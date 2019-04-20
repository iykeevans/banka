import pgpromise from 'pg-promise';
import env from 'dotenv';

env.config();

let connectionString;

switch (process.env.NODE_ENV) {
  case 'Test':
    connectionString = process.env.TEST_DATABASE_URL;
    break;
  case 'Development':
    connectionString = process.env.DATABASE_URL;
    break;
  default:
    throw new Error('Please specify development environment in .env file');
}

const pgp = pgpromise();
console.log('============>', connectionString, process.env.NODE_ENV);

const db = pgp(connectionString);

export default db;
