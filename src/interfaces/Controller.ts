import { Router } from "express";
import Service from "./Service";

export default interface Controller {
    readonly port: number;
    readonly path: string;
    readonly services: Service[];
    readonly router: Router;
}