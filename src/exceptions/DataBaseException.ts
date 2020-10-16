import HttpException from "./HttpException";

export default class DataBaseException extends HttpException{
    constructor(message: string) {
        super(404, message);
    }
}