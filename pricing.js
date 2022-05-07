//проверка валидности данных
const regExpEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
const regExpPhone = /^[+]{1}[\d]{12,12}$/; //+375XXxxxxxxx
const regExpName = /^[a-z]+$/i; 

//массив доступных подписок
const allSubscriprions=[{id:"sub_free", name: "Free Trail"},
{id:"sub_fifty", name: "Basic"},
{id:"sub_hundred", name: "Ultimates"},]

let isPremium = false;//была ли оформлена подписка


function removeWrapper(){
    let wrapper = document.getElementById("wrapper_subscription");
    wrapper?.remove();
    document.body.style.overflow = "auto";
    document.body.style.filter = "none";
}

let validUserData = 0;//00000111 - phone email name(младший бит) 
const VALID_DATA = 0b111;

function getSubscribe(event){//модальное окно оформления подписки
    if(isPremium){
        let rect = event.target.getBoundingClientRect();
        let x = rect.x + document.body.scrollLeft-90;
        let y = rect.y + document.scrollingElement.scrollTop;
        showMessage(x,y,x,y-90,5000,"You always have subscription!","message--update2",document.documentElement);
        return;
    }
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper_subscription";
    wrapper.className = "wrapper--subscription";
    document.documentElement.prepend(wrapper);
    //
    document.body.style.overflow="hidden";
    document.body.style.filter = "blur(3px)";
    //создание модального окна
    let modalWindow = document.createElement("div");
    modalWindow.className = "wrapper--subscription__modal-frame";
    wrapper.append(modalWindow);
    //заголовок 1
    let infoSpan = document.createElement("span");
    infoSpan.className = "wrapper--subscription__modal-frame__span-info";
    infoSpan.textContent = "Confirm choice";
    modalWindow.append(infoSpan);
    //заголовок 2
    let subSpan = document.createElement("span");
    subSpan.className = "wrapper--subscription__modal-frame__span-info";
    for(let x of allSubscriprions){
        if(x.id == this.dataset['id']){subSpan.textContent = x.name; break;}
    }
    subSpan.style.color = "rgb(57,73,171)";
    subSpan.style.marginBottom = "35px";
    modalWindow.append(subSpan);
    //кнопка закрытия
    let closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-regular");
    closeIcon.classList.add("fa-circle-xmark");
    closeIcon.classList.add("wrapper--subscription__modal-frame__close");
            //закрытие окна на крестик
    closeIcon.addEventListener("click",()=>{
        removeWrapper();
    })
    modalWindow.append(closeIcon);
    //форма
    let form = document.createElement("form");
    modalWindow.append(form);
    //имя
    let divName = document.createElement("div");
    divName.className = "wrapper--subscription__modal-frame__form__div";

    let labelName = document.createElement("label");
    labelName.className = "wrapper--subscription__modal-frame__label";
    labelName.textContent = "Name:";
    divName.append(labelName);

    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.className = "wrapper--subscription__modal-frame__input";
    //проверка имени
    inputName.addEventListener("input",(event)=>{
        if(regExpName.test(event.target.value)){
            validUserData |= 0b001;
            event.target.style.color = "green";
            //event.target.style.textDecoration = "none";
        }else{
            validUserData &= 0b110;
            event.target.style.color = "red";
            //event.target.style.textDecoration = "wavy";
            //event.target.style.textDecorationColor = "red";
        }
    });
    inputName.placeholder = "Name";
    divName.append(inputName);
    form.append(divName);
    //email
    let divEmail = document.createElement("div");
    divEmail.className = "wrapper--subscription__modal-frame__form__div";

    let labelEmail = document.createElement("label");
    labelEmail.className = "wrapper--subscription__modal-frame__label";
    labelEmail.textContent = "E-mail:";
    divEmail.append(labelEmail);

    let inputEmail = document.createElement("input");
    inputEmail.type = "text";
    inputEmail.className = "wrapper--subscription__modal-frame__input";
    //проверка email
    inputEmail.addEventListener("input",(event)=>{
        if(regExpEmail.test(event.target.value)){
            validUserData |= 0b010;
            event.target.style.color = "green";
        }else{
            validUserData &= 0b101;
            event.target.style.color = "red";
        }
    });
    inputEmail.placeholder = "example@domen.xx";
    divEmail.append(inputEmail);

    form.append(divEmail);
    //phone
    let divPhone = document.createElement("div");
    divPhone.className = "wrapper--subscription__modal-frame__form__div";

    let labelPhone = document.createElement("label");
    labelPhone.className = "wrapper--subscription__modal-frame__label";
    labelPhone.textContent = "Phone number:";
    divPhone.append(labelPhone);

    let inputPhone = document.createElement("input");
    inputPhone.type = "text";
    inputPhone.className = "wrapper--subscription__modal-frame__input";
    //проверка phone
    inputPhone.addEventListener("input",(event)=>{
        if(regExpPhone.test(event.target.value)){
            validUserData |= 0b100;
            event.target.style.color = "green";
        }else{
            validUserData &= 0b011;
            event.target.style.color = "red";
        }
    });
    inputPhone.placeholder = "+123456789012";
    divPhone.append(inputPhone);
    form.append(divPhone);

    let submitButton = document.createElement("button");
    submitButton.className = "wrapper--subscription__modal-frame__button";
    submitButton.addEventListener("click",purchaiseSubscription);
    submitButton.textContent = "CONFIRM";
    //submitButton.disabled = "true";
    form.append(submitButton);


    //закртие окна на пустую область
    wrapper.addEventListener("click",function(event){
        if(event.target.id == wrapper.id){
            removeWrapper();
        }
    });
    
}

//функция обработки оформления подписки (нажатие на кнопку CONFIRM)
function purchaiseSubscription(event){
    if(!isPremium){
        let rect = event.target.getBoundingClientRect();
        let x = rect.x-(400-180)/2;//размеры кнопки..лень в константы заносить
        let y = rect.y-10;
        let y2 = rect.y-30;
        if(validUserData == VALID_DATA){
            let wrapper = this.closest("#wrapper_subscription");
            showMessage(x,y,x,y2,5000,"Thank you! Check your email for details!","message--update1",document.documentElement);
            setTimeout(()=>{
                removeWrapper();
            },5000);
            isPremium = true;
            localStorage.setItem("isPremium","true");
        }else{
            showMessage(x,y,x,y2,3000,"Your data is incorrect!","message--update1",document.documentElement);
        }
    }
    event.preventDefault();
}

function registerHandlers(){
    //регистрация обработчиков для кнопок оформления подписки
    let priceBoxes = document.querySelectorAll(".pricing .Suggestions .PriceBox");
    for(let div of priceBoxes){
        let button = div.querySelector(".BasicButton");
        button.addEventListener("click",getSubscribe);
    }
}




let lastMessage=null;


//ФУНККЦИЯ ПОКАЗА СООБЩЕНИЯ НА ЭКРАНЕ
//по умолчанию - абсолют в корневом элементе
function showMessage(left1,top1,left2,top2,time,message,addStyle="",rootElement=document.documentElement){
    lastMessage=(lastMessage==null)?null:(lastMessage.remove(),null);
    let messageDiv = document.createElement("pre");
    messageDiv.className = "message";
    messageDiv.textContent = message;
    messageDiv.style.left = left1 +"px";
    messageDiv.style.top = top1+"px";
    rootElement.append(messageDiv);
    if(addStyle!=""){
        messageDiv.classList.add(addStyle);
    }
    messageDiv.style.transition = "top " + time + "ms, " + "left" + time + "ms";
    setTimeout(()=>{
        messageDiv.style.top = top2+"px";
        messageDiv.style.left = left2+"px";
    },20);
    lastMessage=messageDiv;
    setTimeout(()=>{
        messageDiv?.remove();
    },time);
}


let prem = localStorage.getItem("isPremium");
if(prem){
    isPremium = prem;
}else{
    isPremium = false;
    if(prem!="false"){
        localStorage.setItem("isPremium","false");//установка в первый раз
    }
}

registerHandlers();