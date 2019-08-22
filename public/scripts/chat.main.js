import { Ajax } from '../libs/ajax.js'
import { Chat } from './chat.js'

const ajax = new Ajax();

const $messageTextArea = document.getElementById('message');
const $locationButton = document.getElementById('send_location');
const $messageButton = document.getElementById('send_message');
const $joinRoom = document.getElementById('join_room');
const $joinRoomButton = document.getElementById('join_room_button');

window.addEventListener("load", () => {
    ajax.headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'x-requested-with',
        'Authorization' : 'Bearer '+ localStorage.getItem('token')
    } 
    ajax.get('http://localhost:3000/user/me')
    .then((response) => {
        document.getElementById('user_info').innerHTML = `Connected as ${response.username}`;
        window.chat = new Chat(document.getElementById('chat_container'), document.getElementById('message_container'), document.getElementById('room_list'), response.rooms, response.username);
    }).catch((reponse) => {
        window.location.href = '/login';
    })
});

document.getElementById('logout').onclick = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

$joinRoomButton.onclick = () => {
    if(!$joinRoom.value) return;
    ajax.post('http://localhost:3000/user/me/join', {room : $joinRoom.value}).then((response) => {
        chat.joinRoom($joinRoom.value);
    }) 
};

$joinRoom.addEventListener('keyup', function(e){
    if (e.keyCode !== 13 || !$joinRoom.value) return;
    ajax.post('http://localhost:3000/user/me/join', {room : $joinRoom.value}).then((response) => {
        chat.joinRoom($joinRoom.value);
    }) 
});

$locationButton.onclick = () => {
    $locationButton.setAttribute('disabled', 'disabled');
    chat.sendLocation().then((location) => {
        $locationButton.removeAttribute('disabled');
    }).catch((e) => alert(e));;
}

$messageTextArea.addEventListener('keyup',function(e){
    if(!$messageTextArea.value || e.keyCode !== 13) { return; }
    chat.sendMessage($messageTextArea.value).then((message) => {
        $messageTextArea.value = '';
    }).catch((e) => alert(e));
});

$messageButton.onclick = () => {
    $messageButton.setAttribute('disabled', 'disabled');
    if(!$messageTextArea.value) { return; }
    chat.sendMessage($messageTextArea.value).then((message) => {
        $messageButton.removeAttribute('disabled');
        $messageTextArea.value = '';
    }).catch((e) => alert(e));;
} 

