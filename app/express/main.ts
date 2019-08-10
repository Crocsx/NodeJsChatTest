
import path from 'path';
import express from 'express';
import hbs from 'hbs';
import * as Routers from '../routers/index';


const publicDirectoryPath = path.join(__dirname, '../../public/');
const viewsPath = path.join(__dirname, '../../public/templates/views')
const partialsPath = path.join(__dirname, '../../public/templates/partials')
const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.use(
    express.json(),
    Routers.UserRouter,
    express.static(publicDirectoryPath)
);

app.get('/chat', (req, res) => {
    res.render('chat');
});

app.get('/*', (req, res) => {
    res.render('login');
});



export default app;