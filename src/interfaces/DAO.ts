export default abstract class DAO<T, KEY> {
    public abstract findAll(): T[];
    public abstract findById(id: KEY): T;
    public abstract findByProperty<U>(propertyName: string, value: U): T[];
    public abstract save(entity: T): boolean;
    public abstract update(id: KEY, entity: T): boolean;
    public abstract delete(id: KEY): boolean;
}