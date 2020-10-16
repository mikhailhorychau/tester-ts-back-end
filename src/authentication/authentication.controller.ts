import { NextFunction, Request, Response, Router } from "express";
import 'dotenv/config';
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from 'bcrypt';

import AllreadyExistsException from "../exceptions/AlreadyExistsException";
import Controller from "../interfaces/Controller";
import { IUser } from "../user/user.model";
import UserStorage from "../user/user.storage";
import UserStorageService from "../user/user.storage.service";
import LoggingIn from "./LoggingIn";
import NotFoundException from "../exceptions/NotFoundException";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import TokenData from "./TokenData";
import DataStoredInToken from "./DataStoredInToken";

export default class AuthenticationController implements Controller {
    readonly path: string;
    readonly router: Router;
    private userStorage: UserStorageService;

    constructor(path: string) {
        this.path = path;
        this.router = Router();

        this.userStorage = new UserStorageService(UserStorage);
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/registration`, this.registration);
        this.router.post(`${this.path}/login`, this.loggingIn);
    }

    private registration = async (request: Request, response: Response, next: NextFunction) => {
        const userData: IUser = request.body;
        try {
            if (await this.userStorage.findOneByProperty("email", userData.email)) {
                throw new AllreadyExistsException('User wtih this email');
            }
            else 
                try {
                    const hashedPassword = await bcrypt.hash(userData.password, 10);
                    const user = await this.userStorage.create({
                        ...userData,
                        password: hashedPassword
                    });
                    (user as IUser).password = '';
                    const tokenData = this.createToken(user as IUser);
                    response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                    response.send(user);
                } catch (error) {
                    next(error);
                }
        } catch (error) {
            next(error);
        }
    }

    private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
        const logInData: LoggingIn = request.body;
        try {
            const user = await this.userStorage.findOneByProperty("email", logInData.email);
            if(user) {
                if(await bcrypt.compare(logInData.password, (user as IUser).password)) {
                    (user as IUser).password = '';
                    const tokenData = this.createToken(user as IUser);
                    response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                    response.send(user);
                } else {
                    throw new WrongCredentialsException();
                }
            } else {
                throw new NotFoundException(logInData.email, "User with");
            }
        } catch (error) {
            next(error);
        }
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    private createToken(user: IUser): TokenData {
        const expiresIn = 60 * 60 * 2;
        const secret = process.env.JWT_SECRET as Secret;
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        }
    }
}