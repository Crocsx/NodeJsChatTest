
import http from 'http';
import socketio from 'socket.io';
import app from './express/main';
import * as mongooseDB from './db/main';
import * as sendGrid from './emails/main';
import * as socketIO from './socket-io/main';

const server = http.createServer(app);
const io = socketio(server);
const port = Number(process.env.PORT);

try {
    mongooseDB.setup();
    sendGrid.setup();
    socketIO.setup(io);
    server.listen(port, () => {
        console.log(`Server is up on port ${port}`);
    })
} catch(e) {
    console.log(e);
}
