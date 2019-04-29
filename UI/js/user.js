const signInForm = document.querySelector('#signInForm');
const signUpForm = document.getElementById('signUpForm');
const signUpToast = document.querySelector('#signUpToast');
const signInToast = document.querySelector('#signInToast');
const logOut = document.querySelector('#logOut');

// logout user
// logOut.addEventListener('click', () => window.location.assign('../auth.html'));

// fetch function for posting data
const postData = (url = ``, data = {}) => fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
  body: JSON.stringify(data), // body data type must match "Content-Type" header
})
  .then(response => response.json()); // parses JSON response into native Javascript objects

// get selected user from options
const getSelectedUser = () => {
  const select = document.querySelector('.select-text');
  const { value } = select.options[select.selectedIndex];
  return value;
};

// logs in user
const userSignIn = async (event) => {
  event.preventDefault();
  const endpoint = 'https://andela-bank.herokuapp.com/api/v1/auth/signin';
  const user = {
    email: event.target[1].value,
    password: event.target[2].value,
  };
  try {
    signInToast.innerHTML = 'Pls chill';
    signInToast.className = 'toast result yellow';
    const { error, data } = await postData(endpoint, user);

    if (error) {
      signInToast.innerHTML = error;
      signInToast.className = 'toast result red';
    } else {
      signInToast.innerHTML = 'You just logged in redirecting you now';
      signInToast.className = 'toast result green';

      if (getSelectedUser() === 'CUSTOMER') {
        window.location.assign('./user/profile.html');
      } else if (getSelectedUser() === 'CASHIER') {
        window.location.assign('./staff/profile.html');
      } else {
        window.location.assign('./admin/profile.html');
      }
    }
  } catch (error) {
    console.log(error);
  }
};


// sign up user
const userSignUp = async (event) => {
  event.preventDefault();
  const endpoint = 'https://andela-bank.herokuapp.com/api/v1/auth/signup';

  const user = {
    firstName: event.target[0].value,
    lastName: event.target[1].value,
    email: event.target[2].value,
    password: event.target[3].value,
    confirmPassword: event.target[4].value,
  };

  try {
    if (user.password !== user.confirmPassword) {
      signUpToast.innerHTML = 'Passwords don\'t match';
      signUpToast.className = 'toast result red';
    } else {
      signUpToast.innerHTML = 'Pls chill';
      signUpToast.className = 'toast result yellow';
      const { error } = await postData(endpoint, user);
      if (error) {
        signUpToast.innerHTML = error;
        signUpToast.className = 'toast result red';
      } else {
        signUpToast.innerHTML = 'You just signed up';
        signUpToast.className = 'toast result green';
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const createAccount = async (event) => {
  event.preventDefault();
  const endpoint = 'andela-bank.herokuapp.com/api/v1/accounts';

  const data = {
    type: event.target[0].value,
    balance: event.target[1].value,
  };

  const token = localStorage.getItem('token');
  console.log(typeof token);

  const result = await postData(endpoint, data);
  console.log(result);
};
