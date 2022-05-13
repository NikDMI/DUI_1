// класс js-modal-window-sender присвоить этим окошечкам

function showModal(header, content) {
	//-------------------background-----------------------
	const modalWrapper = document.createElement("div");
	modalWrapper.id = "js-modal-wrapper";
	modalWrapper.classList.add("js-modal-wrapper");
	modalWrapper.addEventListener("click", removeModal);
	document.documentElement.prepend(modalWrapper);    
	document.body.style.overflow = "hidden";
    document.body.style.filter = "blur(3px)";
	//--------------------window--------------------------
	const modalWindow = document.createElement("div");
	modalWindow.id = "js-modal-window";
	modalWindow.classList.add("js-modal-window");
	document.documentElement.prepend(modalWindow);
	//--------------------header--------------------------
	const headerElement = document.createElement("h2");
	headerElement.textContent = header;
	headerElement.classList.add("js-modal-window-header");
	modalWindow.append(headerElement);
	//--------------------content-------------------------
	const contentElement = document.createElement("p");
	contentElement.textContent = content;
	contentElement.classList.add("js-modal-window-text");
	modalWindow.append(contentElement);
}

function removeModal() {
	const modalWrapper = document.getElementById('js-modal-wrapper');
	modalWrapper?.remove();
	const modalWindow = document.getElementById('js-modal-window');
	modalWindow?.remove();
	document.body.style.overflow = "auto";
    document.body.style.filter = "none";
}

const jsSenders = document.getElementsByClassName('js-modal-window-sender');
for (let i = 0; i <= jsSenders.length; i++) {
	const headerElement = (jsSenders[i].getElementsByClassName("services-item-header"))[0];
	const textElement = (jsSenders[i].getElementsByClassName("services-item-text"))[0];	
	jsSenders[i].addEventListener("click", ()=>{showModal(headerElement.textContent, textElement.textContent);});
}