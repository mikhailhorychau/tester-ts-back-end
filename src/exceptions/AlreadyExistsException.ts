import HttpException from "./HttpException";

export default class AllreadyExistsException extends HttpException{
    constructor(message: string) {
        super(404, `${message} allready exists`);
    }
}