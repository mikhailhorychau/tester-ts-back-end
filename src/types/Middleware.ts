import { NextFunction, Request, Response } from "express";

export type MiddlewareFunction = (request?: Request, response?: Response, next?: NextFunction) => void;
export type MiddlewareWrapper = (options?: any) => MiddlewareFunction;
export type Middleware = MiddlewareWrapper | MiddlewareFunction;
