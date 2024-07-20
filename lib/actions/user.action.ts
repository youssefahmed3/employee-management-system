"use server"
import connectToDb from "@/lib/mongodb";
import User from "@/lib/models/user.model";
import { UserType } from "@/lib/models/user.model";
import {hashPassword} from "@/lib/isValidPassword";

export async function createUser(userData: UserType) {
    let hashedPassword;
    if(userData.password) hashedPassword = await hashPassword(userData.password as string);

    try {
        await connectToDb();
        console.log(User);

        const user = await User.create({
            username: userData.username,
            email: userData.email,
            password: hashedPassword ?? '',
            provider: userData.provider
        });
        console.log(user);
        return {user: user, error: null};

    } catch (error: any) {
        console.log(error.message);
        return {user: null, error: error.message};


    }
};

export async function getUserByEmail(email: string)  {
    try {
        await connectToDb();
        const user = await User.findOne({ email }).lean();
        if (user) {
            // If user is found, transform the user object as needed:
            user.id = user._id.toString();
            user.createdAt = user.createdAt.toLocaleString();
            user.updatedAt = user.updatedAt.toLocaleString();
            // delete user._id;
            console.log(user);
            
            return user;
        }
        return null
        
    } catch (error: unknown) {
        console.error('Error fetching user by email:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function getUserById(id: string): Promise<UserType | null> {
    try {
        await connectToDb();
        const user = await User.findById(id).lean();
        return user;
        
    } catch (error: unknown) {
        console.error('Error fetching user by email:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function updateUserProviderByEmail(email: string, provider: string){
    try {
        await connectToDb();
        const user = await User.findOneAndUpdate({email: email}, { provider: provider }, { new: true }).lean();
        return user;
    } catch (error: any) {
        console.error('Error updating Order status by id:', error instanceof Error? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}