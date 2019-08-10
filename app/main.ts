
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

io.on('connection', (socket) => {
    console.log('new websocket Connection');
    socket.emit('USER_JOIN');

    socket.on('USER_SENT_MESSAGE', (message) => {
        console.log('new websocket Connection');
        socket.emit('NEW_MESSAGE', message);
    })
})




try {
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
} catch(e) {
    console.log(e);
}
