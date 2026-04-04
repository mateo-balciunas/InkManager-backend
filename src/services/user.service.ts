import prisma from "../config/db.js";
import { CreateUserSchema, UpdateUserSchema,  } from "../schemas/user.schema.js";
import { hashPassword } from "../utils/passwordHash.js";


const userSelect = {
    id: true,
    email: true,
    password: true,
    role: true, 
    createdAt: true
}
export class UserService {
    
    //Create user
    async create(data: CreateUserSchema) {
        const hashedPassword = await hashPassword(data.password);
        return await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            },
            select: userSelect
        });
    }

    //FIND ALL USERS
    async findAllUsers() {
        return await prisma.user.findMany({
            select: userSelect
        });
    }

    //FIND ONE USER BY ID
    async findUser( id: string ){
        return await prisma.user.findUnique({
            where: { id },
            select: userSelect
        });
    }

    //DELETE USER BY ID
    async deleteUser( id: string ) {
        return await prisma.user.delete({
            where: { id },
            select: userSelect
        });
    }

    //UPDATE USER
    async updateUser( id: string, data: UpdateUserSchema) {
        const updateData: any = { ...data};

        return await prisma.user.update({
            where: { id },
            data: updateData,
            select: userSelect
        })
    }
}