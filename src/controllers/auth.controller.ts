import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
  //Register

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Email and password are required"});
        }
        const result = await authService.registerUser(email, password);

        return res.status(200).json({ status: "success", data: result });
        } catch (error) {
        next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Email and password are required"});
        }
        const result = await authService.loginUser(email, password);
        return res.status(200).json({ status: "success", data: result });
        } catch (error) {
        next(error);
        }
    }

    logout = (req: Request, res: Response, next: NextFunction ) => {
        
        return res.status(200).json({ status: "success", message: "Logout successful"});
    }
}
