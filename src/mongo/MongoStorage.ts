import { Model } from "mongoose";
import PropertyNotFoundException from "../exceptions/PropertyNotFoundException";
import NotFoundException from "../exceptions/NotFoundException";
import SaveException from "../exceptions/SaveException";
import Entity from "../interfaces/Entity";
import Storage from "../interfaces/Storage";
import DataBaseException from "../exceptions/DataBaseException";

export default class MongoStorage<T extends Entity> implements Storage<T>{

    private model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }
    
    async findAll(): Promise<T[] | {} | Error> {
        try {
            return this.model.find();
        } catch (error) {
            throw new DataBaseException(error);
        }
    }
    
    async findById(id: any): Promise<T | Error | null> {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new NotFoundException(id, this.model.modelName);
        }
    }
    
    async findByProperty(propertyName: keyof T, propertyValue: any): Promise<T[] | T | {}> {
        try {
            return await this.model.find({[propertyName]: propertyValue});
        } catch (error) {
            throw new PropertyNotFoundException(propertyName as string);
        }
    }
    
    async findOneByProperty(propertyName: keyof T, propertyValue: any): Promise<Error | T | null> {
        try {
            const result = await this.model.findOne();
            if (result) return result;
            else throw new NotFoundException(propertyValue, this.model.modelName)
        } catch (error) {
            throw new PropertyNotFoundException(propertyName as string);
        }
    }
    
    async create(entity: T) {
        try {
            return await this.model.create(entity);
        } catch (error) {
            throw new SaveException(error);
        }
    }

    async save(entity: T): Promise<T | Error> {
        try {
            const storageEntity = new this.model(entity);
            return await storageEntity.save();
        } catch (error) {
            throw new SaveException(error)
        }
    }
    
    async update(id: any, entity: T): Promise<T | Error> {
        try {
            return await this.model.findByIdAndUpdate(id, entity);
        } catch (error) {
            throw new SaveException(error);
        }
    }

    async delete(id: any): Promise<T | Error> {
        try {
            return await this.model.findByIdAndRemove(id);
        } catch (error) {
            throw new DataBaseException(error);
        }
    }
}
