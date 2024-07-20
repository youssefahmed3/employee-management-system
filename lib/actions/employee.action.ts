"use server"
import connectToDb from "@/lib/mongodb";
import User, { EmployeeType } from "@/lib/models/employee.model";
import Employee from "@/lib/models/employee.model";

export async function createEmployee(userData: EmployeeType, userId: string) {

    try {
        await connectToDb();
        console.log(Employee);

        const employee = await Employee.create({
            name: {
                firstName: userData.name.firstName,
                lastName: userData.name.lastName
            },
            job_title: userData.job_title,
            salary: userData.salary,
            email: userData.email,
            phone: userData.phone,
            createdBy: userId,
        });
        console.log(employee);
        return true;

    } catch (error: any) {
        console.log(error.message);
        return false;

    }
};

export async function fetchAllEmployees() {
    try {
        await connectToDb();
        // Use .lean() for faster performance as it returns plain JavaScript objects instead of Mongoose documents.
        const employees = await Employee.find().lean();
        return employees.map(employee => {
            // Optionally, if you want to convert _id to a string or perform other transformations:
            employee.id = employee._id.toString();
            employee.createdAt = employee.createdAt.toLocaleString();
            employee.updatedAt = employee.updatedAt.toLocaleString();
            // delete user._id;
            console.log(employee);
            
            return employee;
        });
    } catch (error: unknown) {
        console.error('Error fetching all users:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function updateEmployee(userData: EmployeeType) {

    try {
        await connectToDb();

        const updatedEmployee = await User.findOneAndUpdate({ email: userData.email }, {
            name: {
                firstName: userData.name.firstName,
                lastName: userData.name.lastName
            },
            job_title: userData.job_title,
            salary: userData.salary,
            email: userData.email,
            phone: userData.phone,
        }, { new: true });
        
        return true
    }
    catch (error: unknown) {
        console.error('Error updating user:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
        return false
    }
}

export async function getEmployeeByEmail(email: string): Promise<EmployeeType | null> {
    try {
        await connectToDb();
        const employee = await Employee.findOne({ email });
        return employee;
        
    } catch (error: unknown) {
        console.error('Error fetching user by email:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function getEmployeeById(id: string): Promise<EmployeeType | null> {
    try {
        await connectToDb();
        const employee = await Employee.findById(id).lean();
       /*  if (employee) {
            // If user is found, transform the user object as needed:
            employee.id = employee._id.toString();
            employee.createdAt = employee.createdAt.toLocaleString();
            employee.updatedAt = employee.updatedAt.toLocaleString();
            employee.createdBy = employee.createdBy.toString();
            // delete user._id;
            console.log(employee);
            
            return employee;
        } */
        return employee
    } catch (error: unknown) {
        console.error('Error fetching user by id:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function deleteEmployee(id: string): Promise<boolean> {
    try {
        await connectToDb();
        const employee = await User.findByIdAndDelete(id);
        return !!employee;
        
    } catch (error: unknown) {
        console.error('Error deleting user:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }  
}

