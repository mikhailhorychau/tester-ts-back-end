import Entity from "./Entity";

export default interface Storage<T extends Entity> {
    findAll(): Promise<T[] | {} | Error>;
    findById(id: any): Promise<T | null | Error>;
    findByProperty(propertyName: keyof T, propertyValue: any): Promise<T[] | T | {} | Error>;
    save(entity: T): Promise<T | Error>;
    update(id: any, entity: T): Promise<T | Error>;
    delete(id: any): Promise<number | Error>;
}