let infor = JSON.parse(localStorage.getItem('contact')) || [];

const regexName = /^[A-Za-zÀ-ÿ]+ [A-Za-zÀ-ÿ]+$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexMessage = /^(\s*\S+\s*){1,200}$/;


document.getElementById('send').addEventListener('click', (e) => {
    e.preventDefault();
    const isAdded = addToObj();
    if (isAdded) {
        localStorage.setItem('contact', JSON.stringify(infor));
        console.log('Updated localStorage:', infor);
    }
});

function addToObj() {
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const messageInput = document.getElementById('message-input');

    clearErrors();

    let obj = { name: '', email: '', message: '' };

    if (regexName.test(nameInput.value)) {
        obj.name = nameInput.value.trim();
    } else {
        showErrorMessage('name-error', 'Please enter a valid name (Firstname, Lastname).');
        return false;
    }


    if (regexEmail.test(emailInput.value)) {
        obj.email = emailInput.value.trim();
    } else {
        showErrorMessage('email-error', 'Please enter a valid email address.');
        return false;
    }


    if (regexMessage.test(messageInput.value)) {
        obj.message = messageInput.value.trim();
    } else {
        showErrorMessage('message-error', 'Message should not exceed 200 words.');
        return false;
    }


    infor.push(obj);


    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';

    return true;
}

function showErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.classList.remove('hidden');
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.text-red-700');
    errorElements.forEach((element) => {
        element.classList.add('hidden');
        element.innerText = '';
    });
}
