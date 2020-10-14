import PropertyNotFoundException from "../exceptions/PropertyNotFoundException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import Service from "../interfaces/Service";
import IUser from "./user.interface";
import User from "./user.model";

export default class UserService implements Service {

    public findAllUsers = async () => await User.find();

    public findUserById = async (id: any) => {
        const user = await User.findById(id);
        return user ? user : new UserNotFoundException(id);
    }

    public findUserByProperty = async (propertyName: string, propertyValue: any) => {
        const user = await User.find({[propertyName]: propertyValue});
        return user ? user : new PropertyNotFoundException(propertyValue);
    }

    public saveUser = async (userProps: IUser) => {
        try {
            const user = new User(userProps);
            await user.save();
        } catch (error) {
            
        }
    }
}