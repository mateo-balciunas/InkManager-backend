import prisma from "../config/db.js";
import { comparePassword, hashPassword } from "../utils/passwordHash.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {
    async loginUser( email: string, password: string ) {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if( !user ){
            throw new Error("Invalid Email");
        }

        const isMatch = await comparePassword( password, user.password );
        if( !isMatch ){
            throw new Error("Invalid Password");
        }

        const token = generateToken({
            id: user.id,
            role: user.role
        });

        return{
            token, 
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        }
    }

    async registerUser( email: string, password: string) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if( existingUser ) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hashPassword( password );
        
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: "CLIENT",
            }
            
        });
        const token = generateToken({
            id: newUser.id,
            role: newUser.role
        });
        
        return {
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
            }
        }
    }
}