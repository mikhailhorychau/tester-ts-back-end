import HttpException from "./HttpException";

export default class PropertyNotFoundException extends HttpException{
    constructor(propertyName: string) {
        super(404, `Cannot find  ${propertyName} property`);
    }
}