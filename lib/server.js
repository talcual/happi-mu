"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
const users_1 = __importDefault(require("./plugins/users"));
const server = hapi_1.default.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.register([prisma_1.default, users_1.default]);
        yield server.start();
        return server;
    });
}
exports.start = start;
process.on('unhandledRejection', (err) => __awaiter(void 0, void 0, void 0, function* () {
    yield server.app.prisma.$disconnect();
    console.log(err);
    process.exit(1);
}));
start().then((server) => {
    console.log(`
        🚀 Server ready at: ${server.info.uri}
        ⭐️ See sample requests: http://pris.ly/e/ts/rest-hapi#3-using-the-rest-api
    `);
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=server.js.map