import bodyParser from 'body-parser';
import { App } from './App';
import errorMiddleware from './middleware/error.middleware';

const app = new App(
    [

    ], 
    [
        bodyParser.json(),
        errorMiddleware
    ], 
    3000, 
    '/api'
);

app.listen();