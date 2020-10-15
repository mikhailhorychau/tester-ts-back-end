import { Model } from "mongoose";
import PropertyNotFoundException from "../exceptions/PropertyNotFoundException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import UserSaveException from "../exceptions/UserSaveException";
import Entity from "../interfaces/Entity";
import Storage from "../interfaces/Storage";

export default class MongoStorage<T extends Entity> implements Storage<T>{

    private model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    async findAll(): Promise<{} | Error | T[]> {
        return await this.model.find();
    }
    async findById(id: any): Promise<T | Error | null> {
        const storageEntity = await this.model.findById(id);
        return storageEntity ? storageEntity : new UserNotFoundException(id);
    }
    async findByProperty(propertyName: keyof T, propertyValue: any): Promise<T[] | T | {} | Error> {
        const storageEntity = await this.model.find({[propertyName]: propertyValue});
        return storageEntity ? storageEntity : new PropertyNotFoundException(propertyName as string);
    }
    async save(entity: T): Promise<T | Error> {
        const storageEntity = new this.model(entity);
        try {
            return await storageEntity.save();
        } catch (error) {
            return new UserSaveException(error)
        }
    }
    async update(id: any, entity: T): Promise<T | Error> {
        const storageEntity = await this.model.findByIdAndUpdate(id, entity);
        return storageEntity ? storageEntity : new UserNotFoundException(id);
    }

    async delete(id: any): Promise<number | Error> {
        const successResponse = await this.model.findByIdAndRemove(id);
        return successResponse ? 200 : new UserNotFoundException(id);
    }
}
