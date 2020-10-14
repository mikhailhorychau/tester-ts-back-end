import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorMiddleware = (error: HttpException | any, request: Request, response: Response, next: NextFunction) => {
    const status = error.status;
    const message = error.message;
    response.status(status).send({message, status});
}

export default errorMiddleware;