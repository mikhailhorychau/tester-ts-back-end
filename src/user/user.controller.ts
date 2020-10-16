import { Router } from "express";
import Controller from "../interfaces/Controller";
import Service from "../interfaces/Service";

export default class UserController implements Controller {
    readonly path: string;
    readonly router: Router;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
    }

    private initializeRoutes() {
        /*Routes*/
    }
} 