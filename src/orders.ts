var { Prisma,PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient()

exports.create = async (event:any, context:any, callback:any) => {
    try {
        const datao = JSON.parse(event.body);

        const sender = await prisma.user.findUnique({
            where: { id: datao.id_user } 
        })
    
        if (sender.balance < datao.total) {
            return {
                statusCode: 502,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({err: "No dispones de la cantidad a pagar."})
            }
        }else{

            // Creating Order
            const createdOrder = await prisma.orders.create({ 
                data : {
                    id_user : datao.id_user, 
                    total   : datao.total
                }
            })

            // Updating Balance of User.
            const buyer = await prisma.user.update({
                where: {
                    id: datao.id_user,
                },
                data: {
                    balance: {
                        decrement: datao.total
                    }
                },
            });

            for(let product of datao.products){
                const bodyOrder = await prisma.orderBody.create({ 
                    data : {
                        id_order    : createdOrder.id, 
                        product     : product.name,
                        price       : product.price
                    }
                });
            }

            const bodyOrder = await prisma.orderBody.findMany({
                where: { id_order: createdOrder.id } 
            });

            let refturn = {
                order : createdOrder,
                body  : bodyOrder
            };

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(refturn)
            }

        }
      

    } catch (e) { 
      console.error(e)
      return { statusCode: 500 }
    }
}