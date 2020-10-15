import { Router } from "express";
import Controller from "../interfaces/Controller";
import Service from "../interfaces/Service";

export default class UserController implements Controller {
    readonly port: number;
    readonly path: string;
    readonly router: Router;
    readonly services: Service[];

    constructor(port: number, path: string, services: Service[]) {
        this.port = port;
        this.path = path;
        this.services = services;
        this.router = Router();
    }

    private initializeRoutes() {
        /*Routes*/
    }
} 