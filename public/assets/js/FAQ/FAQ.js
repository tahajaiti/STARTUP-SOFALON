function UserRights() {
    const user_rights = document.getElementById('UserRights');
    user_rights.classList.toggle('hidden');
}
function REFUNDPOLICY() {
    const REFUNDPOLICY = document.getElementById('REFUNDPOLICY');
    REFUNDPOLICY.classList.toggle('hidden');
}
function Trust() {
    const Trust = document.getElementById('Trust');
    Trust.classList.toggle('hidden');
}
function PAYMENT() {
    const pay = document.getElementById('pay');
    pay.classList.toggle('hidden');
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
function ouvrir_qustion_box(i) {

    switch (i) {
        case 1:
            document.getElementById('Q1_box').classList.toggle('hidden');
            break;
        case 2:
            document.getElementById('Q2_box').classList.toggle('hidden');
            break;
        case 3:
            document.getElementById('Q3_box').classList.toggle('hidden');
            break;
        case 4:
            document.getElementById('Q4_box').classList.toggle('hidden');
            break;
        case 5:
            document.getElementById('Q5_box').classList.toggle('hidden');
            break;
        case 6:
            document.getElementById('Q6_box').classList.toggle('hidden');
            break;
        default:
            break;
    }

}
function ouvrir_qustion_Trust(i) {
    switch (i) {
        case 1:
            document.getElementById('Q1_Trust').classList.toggle('hidden');
            break;
        case 2:
            document.getElementById('Q2_Trust').classList.toggle('hidden');
            break;
        case 3:
            document.getElementById('Q3_Trust').classList.toggle('hidden');
            break;
        case 4:
            document.getElementById('Q4_Trust').classList.toggle('hidden');
            break;
        case 5:
            document.getElementById('Q5_Trust').classList.toggle('hidden');
            break;
        case 6:
            document.getElementById('Q6_Trust').classList.toggle('hidden');
            break;
        default:
            break;
    }

}
function ouvrir_qustion_pay(i) {
    switch (i) {
        case 1:
            document.getElementById('Q1_pay').classList.toggle('hidden');
            break;
        case 2:
            document.getElementById('Q2_pay').classList.toggle('hidden');
            break;
        case 3:
            document.getElementById('Q3_pay').classList.toggle('hidden');
            break;
        case 4:
            document.getElementById('Q4_pay').classList.toggle('hidden');
            break;
        case 5:
            document.getElementById('Q5_pay').classList.toggle('hidden');
            break;
        case 6:
            document.getElementById('Q6_pay').classList.toggle('hidden');
            break;
        default:
            break;
    }
}