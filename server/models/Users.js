import users from '../utils/dummyUsers';

const addUser = user => new Promise((resolve) => {
  users.push(user);
  resolve(user);
});

const findUser = (param) => {
  const user = users.find(item => item.email === param.email || item.id === param.id);
  return user;
};

const loginUser = data => new Promise((resolve) => {
  const user = findUser(data);
  resolve(user);
});

export { addUser, findUser, loginUser };
