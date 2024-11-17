let login;

async function FetchLogin() {
  const response = await fetch('./assets/login.json');
  login = await response.json();
  console.log("Fetched data:", login);
}

const form = document.getElementById('form');
const errorMsg = document.getElementById('errormsg');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const emailValue = document.getElementById('email').value;
  const passValue = document.getElementById('password').value;

  console.log('Email:', emailValue, 'Password:', passValue);


  errorMsg.classList.add('hidden');

  if (emailValue === login.email && passValue === login.password) {
    localStorage.setItem('login', 'true'); 
    window.location.href = 'Dashboard.html';
  } else {

    errorMsg.classList.remove('hidden');
    errorMsg.textContent = 'Invalid email or password.';
  }
});

FetchLogin();
