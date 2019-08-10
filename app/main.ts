
import http from 'http';
import socketio from 'socket.io';
import app from './express/main';
import * as mongooseDB from './db/main';
import * as sendGrid from './emails/main';



const server = http.createServer(app);
const io = socketio(server);
const port = Number(process.env.PORT);

mongooseDB.setup();
sendGrid.setup();

// https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
io.on('connection', (socket) => {
    console.log('New websocket Connection');
    io.emit('SERVER:NEW_USER');

    socket.on('USER:SEND_MESSAGE', (message) => {
        socket.broadcast.emit('SERVER:NEW_MESSAGE', message);
    })

    socket.on('disconnect', (message) => {
        io.emit('SERVER:USER_LEFT', message);
    }) 
});

try {
    server.listen(port, () => {
        console.log(`Server is up on port ${port}`);
    })
} catch(e) {
    console.log(e);
}
