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
    console.log($messageTextArea.value)
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
    $chat.insertAdjacentHTML('beforeend', `
        <li class="clearfix">
            <div class="message-data align-center">
                <span class="message-data-name" >${isJoin ? 'User Joined' : ' User Left'}</span>
            </div>
        </li>
    `);
}

let addMessage = (response) => {
    const time = new Date(response.timestamp);
    const selfMessage = response.user === 'Me';
    $chat.insertAdjacentHTML('beforeend', `
        <li class="clearfix">
            <div class="message-data ${selfMessage ? 'align-right' : ''}">
                ${selfMessage ? 
                    `<span class="message-data-time" >${time.getHours() + ":" + (time.getMinutes() < 10? '0': '') + time.getMinutes()}</span> &nbsp; &nbsp;
                    <span class="message-data-name" >${response.user}</span> <i class="fa fa-circle me"></i>` 
                : `                
                    <span class="message-data-name"><i class="fa fa-circle online"></i> ${response.user}</span>
                    <span class="message-data-time">${time.getHours() + ":"+ (time.getMinutes() < 10? '0': '') + time.getMinutes()}</span>
                `}  
            </div>
            <div class="message ${selfMessage ? 'other-message float-right' : 'my-message'}">
                ${response.message}
            </div>
        </li>
    `);
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