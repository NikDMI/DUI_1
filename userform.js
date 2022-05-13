var form = document.querySelector(".user-form");
var userName = form.querySelector('.input-name');
var email = form.querySelector('.input-email');
var massage = form.querySelector('.input-massage');
var sendBtn = form.querySelector(".contact-input-btn");
sendBtn.setAttribute('disabled', true);
form.addEventListener('keyup', changeFormHandler);

function validateName(name){
    var regex = /^[a-z]+$/i; 
    return regex.test(name);
   }
function validateMassage(massage){
    var regex = /^[\w]{1}[\w\s]*$/i; 
    return regex.test(massage);
   }
function validateEmail(email){
    var regex = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    return regex.test(email);
   }

function changeFormHandler() {
    if ((!validateName(userName.value) || !validateMassage(massage.value)) || !validateEmail(email.value)){
        sendBtn.setAttribute('disabled', true);
    }else{
        sendBtn.removeAttribute('disabled');
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const windowInnerWidth = document.documentElement.clientWidth;
    const windowInnerHeight = document.documentElement.clientHeight;
    x = windowInnerWidth / 3;
    y = windowInnerHeight /2;
    y2 = y - 30;
    showMessage(x,y,x,y2,5000,"the message was sent successfully","message--update1",document.documentElement)

})