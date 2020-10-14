import bodyParser from 'body-parser';
import { App } from './App';

const app = new App(
    [

    ], 
    [
        bodyParser.json()
    ], 
    3000, 
    '/api'
);

app.listen();