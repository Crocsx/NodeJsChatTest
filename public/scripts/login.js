import { Ajax } from '../libs/ajax.js'

const loginBtn = document.getElementById('go_login');
const signupBtn = document.getElementById('go_signup');
const ajax = new Ajax();

document.getElementById('signup').onclick = () => {
	const username = document.getElementById('signup_name').value;
	const email = document.getElementById('signup_mail').value;
	const password = document.getElementById('signup_password').value;
	const errorDiv = document.getElementById('signup_error');
	if(username && email && password){
		ajax.post('http://localhost:3000/user/signup', {
			username,
			password,
			email
		}).then((response) => {
			localStorage.setItem('token', response.token);
			window.location.href = '/chat';
		}).catch(response => errorDiv.innerHTML = "Invalid fields")
	} else {
		errorDiv.innerHTML = 'Please fullfil all fields';
	}
}

document.getElementById('login').onclick = () => {
	const username = document.getElementById('login_name').value;
	const password = document.getElementById('login_password').value;
	const errorDiv = document.getElementById('login_error');
	if(username && password){
		ajax.post('http://localhost:3000/user/login', {
			username,
			password
		}).then((response) => {
			localStorage.setItem('token', response.token);
			window.location.href = '/chat'		
		}).catch(response => errorDiv.innerHTML = "Invalid credentials")
	}
}

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

