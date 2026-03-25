"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointmentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
exports.createAppointmentSchema = zod_1.default.object({
    id: zod_1.default.uuid({ error: 'ID does not match valid UUID format' }),
    scheduleAt: zod_1.default.iso.datetime(),
    duration: zod_1.default.int(),
    status: zod_1.default.enum(client_1.AppointmentStatus).default("PENDING"),
    price: zod_1.default.number(),
    artistId: zod_1.default.uuid({ error: 'artistId does not match valid UUID format' }),
    clientId: zod_1.default.uuid({ error: 'clientId does not match valid UUID format' }),
    companyId: zod_1.default.uuid({ error: 'companyId does not match valid UUID format' }),
});
//# sourceMappingURL=appointment.schema.js.map