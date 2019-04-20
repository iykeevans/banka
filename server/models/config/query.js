export const userQuery = `INSERT INTO
  users(id, email, firstname, lastname, password, type, is_admin, createdOn)
  VALUES($<id>, $<email>, $<firstName>, $<lastName>, $<password>, $<type>, $<isAdmin>, $<createdOn>) RETURNING *`;

export const accountQuery = `INSERT INTO
  accounts(id, accountnumber, owner, type, status, balance, createdOn)
  VALUES($<id>, $<accountNumber>, $<owner>, $<type>, $<status>, $<balance>, $<createdOn>) RETURNING *`;

export const transactionQuery = `INSERT INTO
  transactions(id, accountnumber, cashier, type, amount, oldbalance, newbalance, createdOn)
  VALUES($<id>, $<accountNumber>, $<cashier>, $<type>, $<amount>, $<oldBalance>, $<newBalance>, $<createdOn>) RETURNING *`;
