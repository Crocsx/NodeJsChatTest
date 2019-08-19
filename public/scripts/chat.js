export class Chat {

    constructor(messageContainer, roomsContainer) {
        this._rooms = new Array();
        this._currentRoom = null;
        this._$messages = messageContainer;
        this._$rooms = roomsContainer;
        this._addEvents();
    }

    _addEvents = () => {
        this.socket = io();

        this.socket.on('SERVER:NEW_USER', (event) => {
            this._addNotification(true);
        });
        
        this.socket.on('SERVER:USER_LEFT', () => {
            this._addNotification(false);
        });
        
        this.socket.on('SERVER:NEW_MESSAGE', (response) => {
            this._addMessage(response);
        });
    
        this.socket.on('SERVER:NEW_LOCATION', (response) => {
            this._addMessage(response);
        });
    };

    _addMessage = ({timestamp, user, content, type}) => {
        const time = new Date(timestamp);
        const selfMessage = user === 'Me';
        if(selfMessage) {
            this.$container.insertAdjacentHTML('beforeend', Handlebars.templates['self-message']({
                time : time.getHours() + ":"+ (time.getMinutes() < 10? '0': '') + time.getMinutes(),
                user: user,
                content: content,
                type : type
            }));
        } else {
            this.$container.insertAdjacentHTML('beforeend', Handlebars.templates['other-message']({
                time : time.getHours() + ":"+ (time.getMinutes() < 10? '0': '') + time.getMinutes(),
                user: user,
                content: content,
                type : type
            }));
        }
    }

    _addNotification = (isJoin) => {
        if(!this._currentRoom) return;      
        this.$container.insertAdjacentHTML('beforeend', Handlebars.templates['chat-event']({
            event : isJoin ? 'User Joined' : ' User Left'
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

    _refreshChat = () => {
/*         while (this._$rooms.firstChild) {
            this._$rooms.removeChild(this._$rooms.firstChild);
        }
        this._$rooms.insertAdjacentHTML('afterbegin', Handlebars.templates['room-list']({
            rooms : this._rooms
        })); */
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
        console.log(room)
        this._currentRoom = room;
    }

    sendLocation = () => {
        return new Promise((resolve, reject) => {
            if(!this._currentRoom){
                return reject();
            }
            if(!navigator.geolocation) { return reject('method unavailable'); }
            navigator.geolocation.getCurrentPosition((position) => {
                let val = position;
                this.socket.emit('USER:SEND_LOCATION', val, (response) => {
                    this._addMessage(response);
                    resolve();
                });
            })
        })
    }

    sendMessage = (message) => {
        return new Promise((resolve, reject) => {
            if(!this._currentRoom){
                return reject();
            }
            this.socket.emit('USER:SEND_MESSAGE', message, (message) => {
                this._addMessage(message);
                resolve(message);
            });
        })
    }
}