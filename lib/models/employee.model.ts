"use server"
import mongoose from 'mongoose';
import { UserType } from './user.model';
// import { createUser } from '@/lib/actions/user.action';

export interface EmployeeType {
    id?: string;
    name: {
        firstName: string;
        lastName: string;
    };
    job_title: string;
    salary: number;
    email: string;
    phone: string;
    createdBy?: string | UserType;
    createdAt?: Date;
    updatedAt?: Date;
}


const employeeSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    job_title: {
        type: String,
        required: false,
        unique: false
    },
    salary: {
        type: Number,
        required: false,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
    { timestamps: true }
);


const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);


export default Employee;