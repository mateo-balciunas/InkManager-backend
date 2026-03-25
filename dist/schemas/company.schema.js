"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCompanySchema = zod_1.default.object({
    id: zod_1.default.uuid({ error: 'ID does not match UUID valid format.' }),
    name: zod_1.default.string(),
    address: zod_1.default.string().optional(),
    contact_info: zod_1.default.string().optional(),
    artists: zod_1.default.array(zod_1.default.uuid()).min(1, 'A company must have at least 1 artist'),
    appointments: zod_1.default.array(zod_1.default.uuid()).default([]),
});
//# sourceMappingURL=company.schema.js.map