import PropertyNotFoundException from "../exceptions/PropertyNotFoundException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import UserSaveException from "../exceptions/UserSaveException";
import User, { IUser } from "./user.model";
import IUserStorage from "./user.storage.interface";
import MongoStorage from "../mongo/MongoStorage";
import Storage from "../interfaces/Storage";

// class UserStorage implements IUserStorage<IUser> {
//     async findAll(): Promise<{} | Error | IUser[]> {
//         return await User.find();
//     }
//     async findById(id: any): Promise<IUser | Error | null> {
//         const user = await User.findById(id);
//         return user ? user : new UserNotFoundException(id);
//     }
//     async findByProperty(propertyName: keyof IUser, propertyValue: any): Promise<IUser[] | IUser | {} | Error> {
//         const user = await User.find({[propertyName]: propertyValue});
//         return user ? user : new PropertyNotFoundException(propertyName);
//     }
//     async save(entity: IUser): Promise<IUser | Error> {
//         const user = new User(entity);
//         try {
//             return await user.save();
//         } catch (error) {
//             return new UserSaveException(error)
//         }
//     }
//     async update(id: any, entity: IUser): Promise<IUser | Error> {
//         const user = await User.findByIdAndUpdate(id, entity);
//         return user ? user : new UserNotFoundException(id);
//     }

//     async delete(id: any): Promise<number | Error> {
//         const successResponse = await User.findByIdAndRemove(id);
//         return successResponse ? 200 : new UserNotFoundException(id);
//     }

// }

export const UserStorage: Storage<IUser> = new MongoStorage<IUser>(User);