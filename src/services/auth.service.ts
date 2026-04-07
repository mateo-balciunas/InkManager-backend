import prisma from "../config/db.js";
import { comparePassword } from "../utils/passwordHash.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {
    async login( email: string, password: string ) {
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
}