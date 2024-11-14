let infor = [];

const send = document.getElementById('send');
const regex = /^[A-Za-zÀ-ÿ]+ [A-Za-zÀ-ÿ]+$/g;
const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
const regex_message = /^(\s*\S+\s*){1,200}$/g;
send.addEventListener("click", (e) => {
    e.preventDefault();

    addToObj();
    console.log(infor)
    let json = JSON.stringify(infor);
    window.localStorage.setItem('json', json);
});
function addToObj() {
    let name = document.getElementById('name-input');
    let email = document.getElementById('email-input');
    let message = document.getElementById('message-input');
    let obj = {
        name: '',
        email: '',
        message: '',
    }
        let person = obj;

       

    
if(regex.test(name)){
    obj.name = name.value;
}
else{
    
const divname = document.getElementById('divname');
const errorName = document.createElement('p');
const place_error_name = divname.appendChild(errorName);


 console.log(errorName);
}


infor.push(person);

}

