"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPortfolioSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createPortfolioSchema = zod_1.default.object({
    id: zod_1.default.uuid({ error: 'ID does not match valid UUID format' }),
    artistId: zod_1.default.uuid({ error: 'artistId does not match valid UUID format' }),
    items: zod_1.default.array(zod_1.default.uuid()).min(1, 'A portfolio must have at least one item.'),
});
//# sourceMappingURL=portfolio.schema.js.map