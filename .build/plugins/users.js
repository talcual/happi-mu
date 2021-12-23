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
const prisma = new client_1.PrismaClient();
// plugin to instantiate Prisma Client
const usersPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: function (server) {
        return __awaiter(this, void 0, void 0, function* () {
            server.route([
                {
                    method: 'POST',
                    path: '/create',
                    handler: createUser,
                },
            ]),
                server.route([
                    {
                        method: 'POST',
                        path: '/getUser',
                        handler: getUserById,
                    },
                ]);
        });
    },
};
exports.default = usersPlugin;
function getUserById(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        const { prisma } = request.server.app;
        const { userId } = request.payload;
        try {
            const user = yield prisma.user.findMany({ where: { id: userId } });
            return h.response(user).code(200);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function createUser(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        const { prisma } = request.server.app;
        const { name, email, balance } = request.payload;
        try {
            const createdUser = yield prisma.user.create({
                data: {
                    name,
                    email,
                    balance,
                },
            });
            return h.response(createdUser).code(201);
        }
        catch (err) {
            console.log(err);
        }
    });
}
//# sourceMappingURL=users.js.map