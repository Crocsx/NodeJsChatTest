import { Ajax } from '../libs/ajax.js'
const ajax = new Ajax();
const socket = io();

const $chat = document.getElementById('chat');
const $messageTextArea = document.getElementById('message');
const $locationButton = document.getElementById('send_location');
const $messageButton = document.getElementById('send_message');

document.getElementById('logout').onclick = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

$locationButton.onclick = () => {
    if(!navigator.geolocation) { return alert('method unavailable'); }
    $locationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        $locationButton.removeAttribute('disabled');
    })
}


$messageTextArea.addEventListener('keyup',function(e){
    if(!$messageTextArea.value) { return; }
    if (e.keyCode === 13) {
        socket.emit('USER:SEND_MESSAGE', $messageTextArea.value, (message) => {
            addMessage(message);
            $messageTextArea.value = '';
        });
    }
});

$messageButton.onclick = () => {
    $messageButton.setAttribute('disabled', 'disabled');
    if($messageTextArea.value) { return; }
    socket.emit('USER:SEND_MESSAGE', $messageTextArea.value, (response) => {
        $messageButton.removeAttribute('disabled');
        addMessage(response);
        $messageTextArea.value = '';
    });
}

let userNotification = (isJoin) => {        
    $chat.insertAdjacentHTML('beforeend', Handlebars.templates['chat-event']({
        event : isJoin ? 'User Joined' : ' User Left'
    }));
}

let addMessage = (response) => {
    const time = new Date(response.timestamp);
    const selfMessage = response.user === 'Me';
    if(selfMessage) {
        $chat.insertAdjacentHTML('beforeend', Handlebars.templates['self-message']({
            time : time.getHours() + ":"+ (time.getMinutes() < 10? '0': '') + time.getMinutes(),
            user: response.user,
            message: response.message
        }));
    } else {
        $chat.insertAdjacentHTML('beforeend', Handlebars.templates['other-message']({
            time : time.getHours() + ":"+ (time.getMinutes() < 10? '0': '') + time.getMinutes(),
            user: response.user,
            message: response.message
        }));
    }
}

window.addEventListener("load", () => {
    ajax.headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'x-requested-with',
        'Authorization' : 'Bearer '+ localStorage.getItem('token')
    } 
    ajax.get('http://localhost:3000/user/me')
    .then((response) => {
        document.getElementById('user_info').innerHTML = `Connected as ${response.username}`;
        addSocketEvent();
    }).catch((reponse) => {
        window.location.href = '/login';
    })
});

let addSocketEvent = () => {
    socket.on('SERVER:NEW_USER', (event) => {
        userNotification(true);
    });
    
    socket.on('SERVER:USER_LEFT', () => {
        userNotification(false);
    });
    
    socket.on('SERVER:NEW_MESSAGE', (response) => {
        addMessage(response);
    });
};