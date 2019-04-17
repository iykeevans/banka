import users from '../utils/dummyUsers';
import { checkSignup, checkLogin } from '../helpers/validate';

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
  const user = users.find(item => item.email === param.email || item.id === param.id);
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

export { addUser, findUser, loginUser };
