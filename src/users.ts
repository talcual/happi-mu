const { Prisma,PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.get = async (event:any, context:any, callback:any) => {
  try {
    const data = JSON.parse(event.body);
    const userId = event.pathParameters.userId;
    const users = await prisma.user.findUnique({
         where: { id: parseInt(userId) } 
    })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error)
    }
  }
}

exports.create = async (event:any, context:any, callback:any) => {
    try {
      const data = JSON.parse(event.body)
      console.log(data);
      const createdUser = await prisma.user.create({ data })
  
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdUser)
      }
    } catch (e) { 
      console.error(e)
      return { statusCode: 500 }
    }
}

exports.deposit = async (event:any, context:any, callback:any) => {
    const data = JSON.parse(event.body);

    try {
        const to = await prisma.user.update({
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
        }

    } catch (e) {
        
    }

}

exports.transfer = async (event:any, context:any, callback:any) => {
    const data = JSON.parse(event.body);

    const sender = await prisma.user.findUnique({
        where: { id: data.from } 
    })

    if (sender.balance < data.amount) {
        return {
            statusCode: 502,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({err: "No dispones de la cantidad a transferir."})
        }
    }else{
        const sender = await prisma.user.update({
            data: {
                balance: {
                    decrement: data.amount,
                },
            },
            where: {
                id: data.from,
            },
        });

        const to = await prisma.user.update({
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
        }
    }

  }