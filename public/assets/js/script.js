function UserRights() {
    const user_rights = document.getElementById('UserRights');
    user_rights.classList.toggle('hidden');
}
let i;
function ouvrir_qustion(i) {
switch (i) {
    case 1:
     document.getElementById('Q1').classList.toggle('hidden');
        break;
    case 2:
     document.getElementById('Q2').classList.toggle('hidden');
        break;
    case 3:
     document.getElementById('Q3').classList.toggle('hidden');
        break;
    case 4:
     document.getElementById('Q4').classList.toggle('hidden');
        break;
    case 5:
     document.getElementById('Q5').classList.toggle('hidden');
        break;
    case 6:
    document.getElementById('Q6').classList.toggle('hidden');
        break;
    default:
        break;
}

}