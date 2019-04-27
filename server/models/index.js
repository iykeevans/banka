import db from './config';

/**
 * @function save
 * @description function to SAVE DATA TO DATABASE.
 * @param {array} data - query and data to add
 * @returns {object} QUERY RESPONSE IN JSON FORMAT
 * @exports save
 */
export const save = ([query, data]) => db.one(query, data);

/**
 * @function findOne
 * @description function to FIND A SINGLE DATA FROM DATABASE.
 * @param {object} data - table to search in with data
 * @returns {object} QUERY RESPONSE IN JSON FORMAT
 * @exports findOne
 */
export const findOne = (data) => {
  const [table, key] = Object.keys(data);
  return db.one(`SELECT * FROM ${data[table]} WHERE ${key} = $1`, data[key]);
};

/**
 * @function find
 * @description function to FIND SEVERAL DATA FROM DATABASE.
 * @param {object} data - table to search in with data
 * @returns {object} QUERY RESPONSE IN JSON FORMAT
 * @exports find
 */
export const find = (data) => {
  const params = Object.keys(data);
  const [table, key] = params;
  if (params.length < 2) {
    return db.any(`SELECT * FROM ${data[table]}`);
  }
  return db.any(`SELECT * FROM ${data[table]} WHERE ${key} = $1`, data[key]);
};

/**
 * @function remove
 * @description function to DELETE DATA FROM DATABASE.
 * @param {object} data - table to search in with data
 * @returns {object} QUERY RESPONSE IN JSON FORMAT
 * @exports remove
 */
export const remove = (data) => {
  const [table, key] = Object.keys(data);
  return db.result(`DELETE FROM ${data[table]} WHERE ${key} = $1`, data[key]);
};

/**
 * @function update
 * @description function to UPDATE DATA IN DATABASE.
 * @param {object} data - table to search in with data
 * @returns {object} QUERY RESPONSE IN JSON FORMAT
 * @exports update
 */
export const update = (data) => {
  const [table, accountnumber, status] = Object.keys(data);
  return db.one(`UPDATE ${data[table]} SET ${status} = $1 WHERE ${accountnumber} = $2 RETURNING *`,
    [data[status], data[accountnumber]]);
};

export const findByResult = (data) => {
  const [table, key] = Object.keys(data);
  return db.result(`SELECT * FROM ${data[table]} WHERE ${key} = $1`, data[key]);
};
