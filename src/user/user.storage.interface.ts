import Storage from "../interfaces/Storage";
import { IUser } from "./user.model";

export default interface IUserStorage<T extends IUser> extends Storage<T> {
    
}