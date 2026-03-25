"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtistSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createArtistSchema = zod_1.default.object({
    id: zod_1.default.uuid({ error: 'ID does not match valid UUID format' }),
    userId: zod_1.default.uuid({ error: 'userID does not match valid UUID format' }),
    companyId: zod_1.default.uuid({ error: 'companyId does not match valid UUID format' }),
    bio: zod_1.default.string().optional(),
    specialties: zod_1.default.array(zod_1.default.uuid()).min(1, 'An artist must hae at least one specialty.'),
    appointments: zod_1.default.array(zod_1.default.uuid()).min(0)
});
//# sourceMappingURL=artist.schema.js.map