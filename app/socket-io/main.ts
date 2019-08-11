import socketio from 'socket.io';
let Filter = require('bad-words');


// https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
export const setup = (io: socketio.Server) =>{
    io.on('connection', (socket: socketio.Socket) => {
        console.log('New websocket Connection');
        io.emit('SERVER:NEW_USER');
    
        socket.on('USER:SEND_MESSAGE', (message: string, callback: Function) => {
            const timestamp = Date.now();
            const filter = new Filter({ placeHolder: '*'});
            let content = filter.clean(message);
            socket.broadcast.emit('SERVER:NEW_MESSAGE', {content, timestamp, user: 'Vincent', type: 'MESSAGE'});
            callback({content, timestamp, user: 'Me', type: 'MESSAGE'});
        })

        socket.on('USER:SEND_LOCATION', (position: any, callback: Function) => {
            let content = `https://google.com/maps?q=${35.7021},${139.6375}&ie=UTF8&iwloc=&output=embed`;
            const timestamp = Date.now();
            socket.broadcast.emit('SERVER:NEW_LOCATION', {content, timestamp, user: 'Me', type: 'LOCATION'});
            callback({content, timestamp, user: 'Me', type: 'LOCATION'});
        })
    
        socket.on('disconnect', (message: string) => {
            io.emit('SERVER:USER_LEFT', message);
        }) 
    });
}


