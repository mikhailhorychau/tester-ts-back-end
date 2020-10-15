import HttpException from "./HttpException";

export default class SaveException extends HttpException{
    constructor(message: string) {
        super(404, message);
    }
}