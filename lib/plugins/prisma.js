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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// plugin to instantiate Prisma Client
const prismaPlugin = {
    name: 'prisma',
    register: function (server) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            server.app.prisma = prisma;
            // Close DB connection after the server's connection listeners are stopped
            // Related issue: https://github.com/hapijs/hapi/issues/2839
            server.ext({
                type: 'onPostStop',
                method: (server) => __awaiter(this, void 0, void 0, function* () {
                    server.app.prisma.$disconnect();
                }),
            });
        });
    },
};
exports.default = prismaPlugin;
//# sourceMappingURL=prisma.js.map