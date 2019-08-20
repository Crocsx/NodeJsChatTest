import socketio from 'socket.io';
let Filter = require('bad-words');


// https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
export const setup = (io: socketio.Server) =>{
    io.on('connection', (socket: socketio.Socket) => {
        console.log('New websocket Connection');
        io.emit('SERVER:NEW_USER');
    
        socket.on('USER:SEND_MESSAGE', (payload: {message: string, room: string}, callback: Function) => {
            const timestamp = Date.now();
            const filter = new Filter({ placeHolder: '*'});
            let content = filter.clean(payload.message);
            socket.broadcast.emit(`SERVER:NEW_MESSAGE_${payload.room}`, {content, timestamp, user: 'Vincent', type: 'MESSAGE'});
            callback({content, timestamp, user: 'Me', type: 'MESSAGE'});
        })

        socket.on('USER:SEND_LOCATION', (payload: {coords: {latitude: number, longitude: number}, room: string}, callback: Function) => {
            console.log(payload)
            let content = `https://google.com/maps?q=${payload.coords.latitude},${payload.coords.longitude}&ie=UTF8&iwloc=&output=embed`;
            const timestamp = Date.now();
            socket.broadcast.emit(`SERVER:NEW_LOCATION_${payload.room}`, {content, timestamp, user: 'Me', type: 'LOCATION'});
            callback({content, timestamp, user: 'Me', type: 'LOCATION'});
        })
    
        socket.on('disconnect', (message: string) => {
            io.emit('SERVER:USER_LEFT', message);
        }) 
    });
}


