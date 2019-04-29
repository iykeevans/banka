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
  case 'Production':
    connectionString = process.env.PROD_DATABASE;
    break;
  default:
    throw new Error('Please specify development environment in .env file');
}

const pgp = pgpromise();
console.log('******* Currently in', process.env.NODE_ENV, 'Enviroment ********');

const db = pgp(connectionString);

export default db;
