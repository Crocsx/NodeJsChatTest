export class Chat {

    constructor(chat, messageContainer, roomsContainer, rooms, username) {
        this._rooms = rooms || new Array();
        this._currentRoom = null;
        this._$chat = chat;
        this._$messages = messageContainer;
        this._username = username;
        this._$rooms = roomsContainer;
        this.socket = io();
        this._addEvents();
        this._refreshRooms();
        if(this._rooms.length > 0){
            this.selectRoom(this._rooms[0]);
        }
    }

    _addEvents = () => {
        this.socket.on(`SERVER:USER_JOINED`, ({username, room}) => {
            this._addUserNotification(username, true);
        });
        
        this.socket.on(`SERVER:USER_LEFT`, ({username, room}) => {
            this._addUserNotification(username, false);
        });
        
        this.socket.on(`SERVER:NEW_MESSAGE`, (response) => {
            this._addMessage(response);
        });
    
        this.socket.on(`SERVER:NEW_LOCATION`, (response) => {
            this._addMessage(response);
        });
    };

    _removeEvents = () => {
        this.socket.removeAllListeners(`SERVER:NEW_USER`);
        
        this.socket.removeAllListeners(`SERVER:USER_LEFT`);
        
        this.socket.removeAllListeners(`SERVER:NEW_MESSAGE`);
    
        this.socket.removeAllListeners(`SERVER:NEW_LOCATION`);
    }

    _addMessage = ({timestamp, user, content, type}) => {
        const time = new Date(timestamp);
        const selfMessage = user === 'Me';
        if(selfMessage) {
            this._$messages.insertAdjacentHTML('beforeend', Handlebars.templates['self-message']({
                time : time.getHours() + ":"+ (time.getMinutes() < 10? '0': '') + time.getMinutes(),
                user: user,
                content: content,
                type : type
            }));
        } else {
            this._$messages.insertAdjacentHTML('beforeend', Handlebars.templates['other-message']({
                time : time.getHours() + ":"+ (time.getMinutes() < 10? '0': '') + time.getMinutes(),
                user: user,
                content: content,
                type : type
            }));
        }
        this._autoScroll();
    }

    _addUserNotification = (user, isJoin) => {
        if(!this._currentRoom) return;      
        this._$messages.insertAdjacentHTML('beforeend', Handlebars.templates['chat-event']({
            event : isJoin ? `${user} Joined` : `${user} Left`
        }));
    }

    _addRoomNotification = (room, isJoin) => {    
        this._$messages.insertAdjacentHTML('beforeend', Handlebars.templates['chat-event']({
            event : isJoin ? `entered room ${room}` : `left room ${room}`
        }));
    }

    _refreshRooms = () => {
        while (this._$rooms.firstChild) {
            this._$rooms.removeChild(this._$rooms.firstChild);
        }
        this._$rooms.insertAdjacentHTML('afterbegin', Handlebars.templates['room-list']({
            rooms : this._rooms
        }));
    }

    _enterRoom(room){
        const $room = document.getElementById(room);
        if($room){
            $room.classList.add('select-room');
        }
        this.socket.emit('USER:JOIN_ROOM', { username : this._username, room }, () =>{
            this._addRoomNotification(room, true);
        });
    }

    _exitRoom(room){
        const $room = document.getElementById(room);
        this.socket.emit('USER:LEAVE_ROOM', { username : this._username, room }, () =>{
            this._addRoomNotification(room, false);
            if($room){
                $room.classList.remove('select-room');
            }
        });
    }

    _autoScroll = () => {
        const $newMessage = this._$messages.lastElementChild;

        const newMessageStyles = getComputedStyle($newMessage)
        const newMessageHeight = $newMessage.offsetHeight + parseInt(newMessageStyles.marginBottom) + parseInt(newMessageStyles.paddingBottom);

        const containerStyle = getComputedStyle(this._$messages);
        const containerMargin = parseInt(containerStyle.marginBottom) + parseInt(containerStyle.paddingBottom);

        const visibleHeight = this._$chat.offsetHeight - containerMargin;
        const contentHeight = this._$chat.scrollHeight;

        const scrollOffset = this._$chat.scrollTop + visibleHeight;
        
        if(contentHeight - newMessageHeight <= scrollOffset) {
            this._$chat.scrollTop = this._$chat.scrollHeight;
        }
    }

    joinRoom = (room) => {
        this._rooms.push(room);
        this._refreshRooms();  
        this.selectRoom(room);
    }

    leaveRoom = (room) => {
        this._rooms = this.rooms.filter((r) => r !== room );
        this._refreshRooms();    
    }

    selectRoom = (room) => {
        if(this._currentRoom) this._exitRoom(this._currentRoom);
        this._currentRoom = room;
        this._enterRoom(this._currentRoom);
    }

    sendLocation = () => {
        return new Promise((resolve, reject) => {
            if(!this._currentRoom){
                return reject('join room first');
            }
            if(!navigator.geolocation) { return reject('method unavailable'); }
            navigator.geolocation.getCurrentPosition((position) => {
                let coords = {username : this._username, latitude : position.coords.latitude, longitude : position.coords.longitude};
                this.socket.emit(`USER:SEND_LOCATION`, {coords, room : this._currentRoom}, (response) => {
                    this._addMessage(response);
                    resolve();
                });
            })
        })
    }

    sendMessage = (message) => {
        return new Promise((resolve, reject) => {
            if(!this._currentRoom){
                return reject('join room first');
            }
            this.socket.emit(`USER:SEND_MESSAGE`, {username : this._username, message, room : this._currentRoom}, (message) => {
                this._addMessage(message);
                resolve(message);
            });
        })
    }
}