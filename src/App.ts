import express, { Application } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import Connection from './interfaces/Connection';
import Controller from './interfaces/Controller';

export class App {
    private app: Application;
    private port: number;
    private path: string;
    private connection: Connection;

    constructor(controllers: Controller[], middlewares: RequestHandlerParams[] , port: number, path: string, connection: Connection) {
        this.app = express();
        this.port = port;
        this.path = path;
        this.connection = connection;

        this.initializeControllers(controllers);
        this.initializeMiddlewares(middlewares);
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach(controller => this.app.use(this.path, controller.router));
    }

    private initializeMiddlewares(middlewares: RequestHandlerParams[]): void {
        middlewares.forEach(middleware => this.app.use(middleware));
    }

    private async initializeConnection(): Promise<any> {
        return await this.connection.connect();
    }

    public async listen(): Promise<any> {
        this.app.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
        await this.initializeConnection()
            .then(() => {
                console.log('Connection initialized')
                })
            .catch(error => console.log(error));
    }

}