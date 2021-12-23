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
const { Prisma, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.get = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = JSON.parse(event.body);
        const userId = event.pathParameters.userId;
        const users = yield prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(users)
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(error)
        };
    }
});
exports.create = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = JSON.parse(event.body);
        console.log(data);
        const createdUser = yield prisma.user.create({ data });
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createdUser)
        };
    }
    catch (e) {
        console.error(e);
        return { statusCode: 500 };
    }
});
exports.deposit = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(event.body);
    try {
        const to = yield prisma.user.update({
            data: {
                balance: {
                    increment: data.amount,
                },
            },
            where: {
                id: data.to,
            },
        });
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(to)
        };
    }
    catch (e) {
    }
});
exports.transfer = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(event.body);
    const sender = yield prisma.user.findUnique({
        where: { id: data.from }
    });
    if (sender.balance < data.amount) {
        return {
            statusCode: 502,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ err: "No dispones de la cantidad a transferir." })
        };
    }
    else {
        const sender = yield prisma.user.update({
            data: {
                balance: {
                    decrement: data.amount,
                },
            },
            where: {
                id: data.from,
            },
        });
        const to = yield prisma.user.update({
            data: {
                balance: {
                    increment: data.amount,
                },
            },
            where: {
                id: data.to,
            },
        });
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sender)
        };
    }
});
//# sourceMappingURL=users.js.map