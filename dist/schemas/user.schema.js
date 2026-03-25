"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
exports.createUserSchema = zod_1.default.object({
    id: zod_1.default.uuid({ error: 'ID does not match UUID format.' }),
    email: zod_1.default.email({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, error: 'Invalid email, please insert valid email.' }),
    password: zod_1.default.string().min(8, "Password must have at least 8 characters"),
    role: zod_1.default.enum(client_1.Role).optional().default(client_1.Role.CLIENT),
});
//# sourceMappingURL=user.schema.js.map