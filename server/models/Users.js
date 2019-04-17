import { hash, genSaltSync } from 'bcrypt';
import users from '../utils/dummyUsers';
import { checkSignup, checkLogin } from '../helpers/validate';

const addUser = user => new Promise(async (resolve, reject) => {
  try {
    const id = { id: users.length + 1 };
    const result = await checkSignup.validate({ ...id, ...user });
    const hashPassword = await hash(result.password, genSaltSync(10));
    result.password = hashPassword;
    users.push(result);
    resolve(result);
  } catch (error) {
    reject(error);
  }
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
