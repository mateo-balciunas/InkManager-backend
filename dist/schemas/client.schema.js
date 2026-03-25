"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createClientSchema = zod_1.default.object({
    id: zod_1.default.uuid({ error: 'ID does not match valid UUID format' }),
    name: zod_1.default.string(),
    lastName: zod_1.default.string(),
    userId: zod_1.default.uuid({ error: 'userId does not match valid UUID format' }),
    phoneNumber: zod_1.default.string().optional(),
    medicalNotes: zod_1.default.string().optional(),
    appointments: zod_1.default.array(zod_1.default.uuid()),
});
//# sourceMappingURL=client.schema.js.map