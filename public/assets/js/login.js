let login;

  async function FetchLogin() {
    const response = await fetch('../../../../login.json');
    login = await response.json();
    console.log("Fetched data:", login);
  }


  const form = document.getElementById('form');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const emailValue = document.getElementById('email').value;
    const passValue = document.getElementById('password').value;

    console.log('Email:', emailValue, 'Password:', passValue);

    if (emailValue === login.email && passValue === login.password) {
      localStorage.setItem('login', 'true'); 
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password.');
    }
  });


  FetchLogin();