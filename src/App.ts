import express, { Application } from 'express';
import Controller from './interfaces/Controller';
import { HandleFunction } from 'connect';

export class App {
    private app: Application;
    private port: number;
    private path: string;

    constructor(controllers: Controller[], middlewares: HandleFunction[], port: number, path: string) {
        this.app = express();
        this.port = port;
        this.path = path;

        this.initializeControllers(controllers);
        this.initializeMiddlewares(middlewares);
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach(controller => this.app.use(this.path, controller.router));
    }

    private initializeMiddlewares(middlewares: HandleFunction[]): void {
        middlewares.forEach(middleware => this.app.use(middleware));
    }

    public listen(): void {
        this.app.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
    }

}