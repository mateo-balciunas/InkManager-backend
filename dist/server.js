"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const db_js_1 = __importDefault(require("./config/db.js"));
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await db_js_1.default.$connect();
        console.log('Database connection established successfully.');
        index_js_1.default.listen(PORT, () => {
            console.log(`InkManager API is running on port: ${PORT}`);
        });
    }
    catch (error) {
        console.log("Failed to connect to database.", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map