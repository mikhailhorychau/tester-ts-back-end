import HttpException from "./HttpException";

export default class NotFoundException extends HttpException{
    constructor(id: string, message: string) {
        super(404, `${message} ${id} not found`);
    }
}