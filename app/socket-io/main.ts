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
            message = filter.clean(message);
            socket.broadcast.emit('SERVER:NEW_MESSAGE', {message, timestamp, user: 'Vincent'});
            callback({message, timestamp, user: 'Me'});
        })
    
        socket.on('disconnect', (message: string) => {
            io.emit('SERVER:USER_LEFT', message);
        }) 
    });
}

