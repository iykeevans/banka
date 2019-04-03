const users = require('../utils/dummyUsers');
const { checkSignup, checkLogin } = require('../helpers/validate');

exports.addUser = user => new Promise((resolve, reject) => {
  const id = { id: users.length + 1 };
  checkSignup({ ...id, ...user })
    .then((result) => {
      users.push(result);
      resolve(result);
    })
    .catch(error => reject(error));
});

exports.loginUser = data => new Promise((resolve, reject) => {
  checkLogin(data)
    .then((result) => {
      const user = users.find(item => item.email === result.email);
      resolve(user);
    })
    .catch(error => reject(error));
});
