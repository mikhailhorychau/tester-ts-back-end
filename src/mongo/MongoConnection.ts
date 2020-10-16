import mongoose from 'mongoose';
import Connection from "../interfaces/Connection";


export default class MongoConnection implements Connection {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    async connect(): Promise<any> {
        return await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    }
    
}