import { Ajax } from '../libs/ajax.js'
const ajax = new Ajax();

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

io();