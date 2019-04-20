import db from '.';

const migration = `
/*Table schema for table users */
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id TEXT UNIQUE,
  email VARCHAR(45) UNIQUE NOT NULL,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  password varchar(100) NOT NULL,
  type TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  createdOn TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

/*Table schema for table accounts */
DROP TABLE IF EXISTS accounts CASCADE;
CREATE TABLE accounts (
  id TEXT UNIQUE,
  accountNumber BIGINT UNIQUE NOT NULL,
  owner TEXT REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  balance FLOAT NOT NULL,
  createdOn TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

/*Table schema for table transactions */
DROP TABLE IF EXISTS transactions CASCADE;
CREATE TABLE transactions (
  id TEXT UNIQUE,
  type TEXT NOT NULL,
  accountNumber BIGINT NOT NULL,
  cashier TEXT REFERENCES users(id) NOT NULL,
  amount INTEGER NOT NULL,
  oldBalance FLOAT NOT NULL,
  newBalance FLOAT NOT NULL,
  createdOn TIMESTAMP,
  PRIMARY KEY (id)
);
`;

const connect = async () => {
  try {
    const result = await db.result(migration);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

connect();
