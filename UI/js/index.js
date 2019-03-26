// variable declaration here 
const signIn = document.getElementById('sign-in');
const signUp = document.getElementById('sign-up');
const formSignUp = document.getElementById('forms__sign-up');
const formSignIn = document.getElementById('forms__sign-in');


// function to show sign in options
const showSignIn = () => {
  signIn.className = 'sign-in flexed flexed--col is-hidden';
  formSignUp.className = 'forms__sign-up flexed flexed--col is-hidden';
  formSignIn.className = 'forms__sign-in flexed flexed--col';
  signUp.className = 'sign-up flexed flexed--col secondary--bg';
}


// function to show sign up options
const showSignUp = () => {
  signIn.className = 'sign-in flexed flexed--col primary--bg';
  formSignUp.className = 'forms__sign-up flexed flexed--col';
  formSignIn.className = 'forms__sign-in flexed flexed--col is-hidden';
  signUp.className = 'sign-up flexed flexed--col is-hidden';
}

const myfunction = (event) => {
  //event.preventDefault();
  const auth = {}
  event.target.forEach(element => {
    console.log(element);
  })
  //console.log(event.target[0])
}