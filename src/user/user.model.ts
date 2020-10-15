import mongoose, { Document } from 'mongoose';
import Entity from '../interfaces/Entity';

export interface IUser extends Entity {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    }
})

const User = mongoose.model<IUser & Document>('User', userSchema);

export default User;