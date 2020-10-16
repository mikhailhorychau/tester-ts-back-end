export default interface Connection {
    connect(): Promise<any>;
}