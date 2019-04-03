const users = require('../utils/dummyUsers');
const { checkSignup } = require('../helpers/validate');

exports.addUser = user => new Promise((resolve, reject) => {
  const id = { id: users.length + 1 };
  checkSignup({ ...id, ...user })
    .then(result => resolve(result))
    .catch(error => reject(error));
});
