import { Router } from "express";
import Service from "./Service";

export default interface Controller {
    readonly path: string;
    readonly router: Router;
}