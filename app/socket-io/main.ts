import socketio from 'socket.io';
let Filter = require('bad-words');


// https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
export const setup = (io: socketio.Server) =>{
    io.on('connection', (socket: socketio.Socket) => {
        console.log('New websocket Connection');
        //io.emit('SERVER:NEW_USER');
    
        socket.on('USER:JOIN_ROOM', (payload : { username : string, room : string }, callback: Function) => {
            console.log(`${payload.username} joined ${payload.room}`);
            socket.join(payload.room);
            socket.broadcast.to(payload.room).emit(`SERVER:USER_JOINED`, { username : payload.username, room  : payload.room});
            callback({username : payload.username, room: payload.room});
        })

        socket.on('USER:LEAVE_ROOM', (payload : { username : string, room : string }, callback: Function) => {
            console.log(`${payload.username} left ${payload.room}`);
            socket.leave(payload.room);
            socket.broadcast.to(payload.room).emit(`SERVER:USER_LEFT`, { username : payload.username, room  : payload.room});
            callback({username : payload.username, room: payload.room});
        })
        
        socket.on('USER:SEND_MESSAGE', (payload: {username : string, message: string, room: string}, callback: Function) => {
            console.log(`message in ${payload.room}`);
            const timestamp = Date.now();
            const filter = new Filter({ placeHolder: '*'});
            let content = filter.clean(payload.message);
            socket.broadcast.to(payload.room).emit(`SERVER:NEW_MESSAGE`, {content, timestamp, user: payload.username, type: 'MESSAGE'});
            callback({content, timestamp, user: 'Me', type: 'MESSAGE'});
        })

        socket.on('USER:SEND_LOCATION', (payload: {username : string, coords: {latitude: number, longitude: number}, room: string}, callback: Function) => {
            console.log(`position in ${payload.room}`);
            let content = `https://google.com/maps?q=${payload.coords.latitude},${payload.coords.longitude}&ie=UTF8&iwloc=&output=embed`;
            const timestamp = Date.now();
            socket.broadcast.to(payload.room).emit(`SERVER:NEW_LOCATION`, {content, timestamp, user: payload.username, type: 'LOCATION'});
            callback({content, timestamp, user: 'Me', type: 'LOCATION'});
        })
    
/*         socket.on('disconnect', (message: string) => {
            io.emit('SERVER:USER_LEFT', message);
        }); */
    });
}


