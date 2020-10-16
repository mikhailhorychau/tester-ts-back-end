import Storage from "../interfaces/Storage";
import { IUser } from "./user.model";

export default class UserStorageService {
    private storage: Storage<IUser>;
    
    constructor(storage: Storage<IUser>)  {
        this.storage = storage;
    }

    public save(user: IUser): Promise<IUser | Error> {
        return this.storage.save(user);
    }

    public create(user: IUser): Promise<IUser | Error> {
        return this.storage.create(user);
    }

    public findOneByProperty(propertyName: keyof IUser, propertyValue: any): Promise<IUser | null | Error>{
        return this.storage.findOneByProperty(propertyName, propertyValue);
    }
}