import Entity from "./Entity";

export default interface Storage<T extends Entity> {
    findAll(): Promise<T[] | {} | Error>;
    findById(id: any): Promise<T | null | Error>;
    findOneByProperty(propertyName: keyof T, propertyValue: any): Promise<T | null | Error>;
    findByProperty(propertyName: keyof T, propertyValue: any): Promise<T[] | T | {} | Error>;
    create(entity: T): Promise<T | Error>;
    save(entity: T): Promise<T | Error>;
    update(id: any, entity: T): Promise<T | Error>;
    delete(id: any): Promise<T | Error>;
}