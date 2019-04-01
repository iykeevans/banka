// variable declaration here 
const signIn = document.getElementById('sign-in');
const signUp = document.getElementById('sign-up');
const formSignUp = document.getElementById('forms__sign-up');
const formSignIn = document.getElementById('forms__sign-in');

// function to show sign in options
const showOptions = () => {
  signIn.classList.toggle('is-hidden');
  formSignUp.classList.toggle('is-hidden');
  formSignIn.classList.toggle('is-hidden');
  signUp.classList.toggle('is-hidden');
}

signInBtn.addEventListener('click', showOptions);
signUpBtn.addEventListener('click', showOptions);
mobileNavBtn.addEventListener('click', () => {
  // nav.style.display = 'none'
  // nav.classList.add('is-hidden');
  // console.log(nav.style.display)
});