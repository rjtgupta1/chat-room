const socket = io();

let Name;

do {
    Name = prompt("Enter Your name ");
} while (!Name);

let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.messageArea');

textarea.addEventListener('keyup',(e)=>{
    // console.log(e);
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
        scrollToBottom();
    }
})


function sendMessage(message){

    let msg = {
        Name,
        message
    }

    // emitting a message

    socket.emit('message',msg);
    textarea.value = '';

    // appending a message to DOM.

    appendMessage(msg,'outbound-msg');

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');

    let className = type;
    mainDiv.classList.add(className,'msg');

    let markup = `
        <h4>${ msg.Name }</h4>
        <p>${ msg.message }</p>
    `

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}

// Receive message

socket.on('message',(msg)=>{
    // console.log(msg);

    appendMessage(msg,'inbound-msg');
    scrollToBottom();

})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}