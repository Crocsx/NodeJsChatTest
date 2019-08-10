import { Ajax } from '../libs/ajax.js'
const ajax = new Ajax();
const socket = io();
const chatContainer = document.getElementById('chat');

window.addEventListener("load", () => {
    ajax.headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'x-requested-with',
        'Authorization' : 'Bearer '+ localStorage.getItem('token')
    } 

    ajax.get('http://localhost:3000/user/me')
    .then((response) => {
        document.getElementById('user_info').innerHTML = `Connected as ${response.username}`;
    }).catch((reponse) => {
        window.location.href = '/login';
    })
});

document.getElementById('logout').onclick = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

document.getElementById('send_location').onclick = () => {
    const message = document.getElementById('message').value;
    socket.emit('USER:SEND_MESSAGE', message);
    addMessage(message, true);
    document.getElementById('message').value = '';
}

document.getElementById('send_message').onclick = () => {
    const message = document.getElementById('message').value;
    socket.emit('USER:SEND_MESSAGE', message);
    addMessage(message, true);
    document.getElementById('message').value = '';
}

socket.on('SERVER:NEW_USER', (event) => {
    userNotification(true);
})

socket.on('SERVER:USER_LEFT', () => {
    userNotification(false);
})

socket.on('SERVER:NEW_MESSAGE', (message) => {
    addMessage(message, false);
})


let userNotification = (isJoin) => {
    chatContainer.insertAdjacentHTML('beforeend', `
        <li class="clearfix">
            <div class="message-data align-center">
                <span class="message-data-name" >${isJoin ? 'User Joined' : ' User Left'}</span>
            </div>
        </li>
    `);
}

let addMessage = (message, isSelf) => {
    if(isSelf) {
        chatContainer.insertAdjacentHTML('beforeend', `
        <li class="clearfix">
            <div class="message-data align-right">
                <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                <span class="message-data-name" >Me</span> <i class="fa fa-circle me"></i>
            
            </div>
            <div class="message other-message float-right">
                ${message}
            </div>
        </li>
    `);
    } else {
        chatContainer.insertAdjacentHTML('beforeend', `
        <li>
            <div class="message-data">
                <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                <span class="message-data-time">10:12 AM, Today</span>
            </div>
            <div class="message my-message">
                ${message}
            </div>
        </li>
    `);   
    }
}
