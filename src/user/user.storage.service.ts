import { isRefType } from "@typegoose/typegoose";
import { NextFunction, Request, Response } from "express";
import Storage from "../interfaces/Storage";
import { IUser } from "./user.model";

export default class UserStorageService {
    private storage: Storage<IUser>;
    
    constructor(storage: Storage<IUser>)  {
        this.storage = storage;
    }

    public async findAll(request: Request, response: Response, next: NextFunction) {
        const result = await this.storage.findAll();
        if (result !instanceof Error) {
            response.send(result);
        } else {
            next(result);
        }
    }
}