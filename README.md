# happi-mu

Serverless App. 
Prisma.io + Serverless-offline


GET  | http://localhost:4000/dev/user/{userId}       
POST | http://localhost:4000/dev/user                
POST | http://localhost:4000/dev/transfer            
POST | http://localhost:4000/dev/deposit             
POST | http://localhost:4000/dev/order               



Para crear usuario 

{
    "name"   : "Juan Pachanga",
    "email"  : "juanup@gmail.com",
    "balance": 300000
}

Para registrar una orden

{
  "id_user" : 1,
  "total":120000,
  "products" : [
  	{
      "name" : "Camara AX",
      "price"   : 60000
    },
    {
      "name" : "Dragon Ball Cosplay Esfera",
      "price"   : 60000
    }
  ]
}

Para agregar dinero

{
    "to"     : 1,
    "amount" : 100000
}


Para transferir entre personas

{
    "from"   : 2,
    "to"     : 1,
    "amount" : 120000
}