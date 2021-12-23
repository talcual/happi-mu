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
var { Prisma, PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();
exports.create = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datao = JSON.parse(event.body);
        const sender = yield prisma.user.findUnique({
            where: { id: datao.id_user }
        });
        if (sender.balance < datao.total) {
            return {
                statusCode: 502,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ err: "No dispones de la cantidad a pagar." })
            };
        }
        else {
            // Creating Order
            const createdOrder = yield prisma.orders.create({
                data: {
                    id_user: datao.id_user,
                    total: datao.total
                }
            });
            // Updating Balance of User.
            const buyer = yield prisma.user.update({
                where: {
                    id: datao.id_user,
                },
                data: {
                    balance: {
                        decrement: datao.total
                    }
                },
            });
            for (let product of datao.products) {
                const bodyOrder = yield prisma.orderBody.create({
                    data: {
                        id_order: createdOrder.id,
                        product: product.name,
                        price: product.price
                    }
                });
            }
            const bodyOrder = yield prisma.orderBody.findMany({
                where: { id_order: createdOrder.id }
            });
            let refturn = {
                order: createdOrder,
                body: bodyOrder
            };
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(refturn)
            };
        }
    }
    catch (e) {
        console.error(e);
        return { statusCode: 500 };
    }
});
//# sourceMappingURL=orders.js.map