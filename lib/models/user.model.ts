"use server"

import mongoose from 'mongoose';

export interface UserType {
    id?: string;
    username: string;
    email: string;
    password?: string;
    provider?: string;
}


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        unique: false
    },
    provider: {
        type: String,
        default: 'credentials',
    }
},
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);


export default User;