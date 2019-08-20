export class Chat {

    constructor(messageContainer, roomsContainer, rooms) {
        this._rooms = rooms || new Array();
        this._currentRoom = null;
        this._$messages = messageContainer;
        this._$rooms = roomsContainer;
        this.socket = io();
        this._addEvents();
        this._refreshRooms();
    }

    _addEvents = () => {
        this.socket.on(`SERVER:NEW_USER_${this._currentRoom}`, () => {
            this._addUserNotification(true);
        });
        
        this.socket.on(`SERVER:USER_LEFT_${this._currentRoom}`, () => {
            this._addUserNotification(false);
        });
        
        this.socket.on(`SERVER:NEW_MESSAGE_${this._currentRoom}`, (response) => {
            this._addMessage(response);
        });
    
        this.socket.on(`SERVER:NEW_LOCATION_${this._currentRoom}`, (response) => {
            this._addMessage(response);
        });
    };

    _removeEvents = () => {
        this.socket.removeAllListeners(`SERVER:NEW_USER_${this._currentRoom}`);
        
        this.socket.removeAllListeners(`SERVER:USER_LEFT_${this._currentRoom}`);
        
        this.socket.removeAllListeners(`SERVER:NEW_MESSAGE_${this._currentRoom}`);
    
        this.socket.removeAllListeners(`SERVER:NEW_LOCATION_${this._currentRoom}`);
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
    }

    _addUserNotification = (isJoin) => {
        if(!this._currentRoom) return;      
        this._$messages.insertAdjacentHTML('beforeend', Handlebars.templates['chat-event']({
            event : isJoin ? 'User Joined' : ' User Left'
        }));
    }

    _addRoomNotification = (room) => {    
        this._$messages.insertAdjacentHTML('beforeend', Handlebars.templates['chat-event']({
            event : `entered room : ${room}`
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
        this._addEvents();
    }

    _exitRoom(room){
        const $room = document.getElementById(room);
        if($room){
            $room.classList.remove('select-room');
        }
        this._removeEvents();
    }

    joinRoom = (room) => {
        this._rooms.push(room);
        this._currentRoom = room;   
        this._refreshRooms();    
    }

    leaveRoom = (room) => {
        this._rooms = this.rooms.filter((r) => r !== room );
        this._refreshRooms();    
    }

    selectRoom = (room) => {
        this._exitRoom(this._currentRoom);
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
                let coords = {latitude : position.coords.latitude, longitude : position.coords.longitude};
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
            this.socket.emit(`USER:SEND_MESSAGE`, {message, room : this._currentRoom}, (message) => {
                this._addMessage(message);
                resolve(message);
            });
        })
    }
}