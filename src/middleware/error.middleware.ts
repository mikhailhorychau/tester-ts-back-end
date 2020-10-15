import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(error: HttpException , request: Request, response: Response, next: NextFunction): void {
    const status = error.status;
    const message = error.message;
    response.status(status).send({message, status});
}

export default errorMiddleware;