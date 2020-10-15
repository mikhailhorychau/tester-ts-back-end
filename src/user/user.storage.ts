import User, { IUser } from "./user.model";
import MongoStorage from "../mongo/MongoStorage";
import Storage from "../interfaces/Storage";

const UserStorage: Storage<IUser> = new MongoStorage<IUser>(User);
export default UserStorage;