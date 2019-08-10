
import path from 'path';
import express from 'express';
import * as Routers from '../routers/index';

const publicDirectoryPath = path.join(__dirname, '../../public/');
const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../../public/views'));
app.use(
    express.json(),
    Routers.UserRouter,
    express.static(publicDirectoryPath)
);
app.get('/*', (req, res) => {
    res.render('login');
});

export default app;