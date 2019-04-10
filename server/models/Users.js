const users = require('../utils/dummyUsers');
const { checkSignup, checkLogin } = require('../helpers/validate');

const addUser = user => new Promise((resolve, reject) => {
  const id = { id: users.length + 1 };
  checkSignup.validate({ ...id, ...user })
    .then((result) => {
      users.push(result);
      resolve(result);
    })
    .catch(error => reject(error));
});

const findUser = (param) => {
  const user = users.find(item => item.email === param.email);
  return user;
};

const loginUser = data => new Promise((resolve, reject) => {
  checkLogin.validate(data)
    .then((result) => {
      const user = findUser(result);
      resolve(user);
    })
    .catch(error => reject(error));
});

module.exports = { addUser, findUser, loginUser };
