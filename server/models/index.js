import db from './config';

export const save = ([query, data]) => db.one(query, data);

export const findOne = (data) => {
  const [table, key] = Object.keys(data);
  return db.one(`SELECT * FROM ${data[table]} WHERE ${key} = $1`, data[key]);
};

export const remove = (data) => {
  const [table, key] = Object.keys(data);
  return db.result(`DELETE FROM ${data[table]} WHERE ${key} = $1`, data[key]);
};

export const update = (data) => {
  const [table, accountnumber, status] = Object.keys(data);
  return db.one(`UPDATE ${data[table]} SET ${status} = $1 WHERE ${accountnumber} = $2 RETURNING *`,
    [data[status], data[accountnumber]]);
};
