# happi-mu

Serverless App. 
Prisma.io + Serverless-offline


GET  | http://localhost:4000/dev/user/{userId}       
POST | http://localhost:4000/dev/user                
POST | http://localhost:4000/dev/transfer            
POST | http://localhost:4000/dev/deposit             
POST | http://localhost:4000/dev/order               

Para probar las rutas se puede usar Postman o ARC. pasadole el payload que tiene cada uno.

Para crear usuario 

```json
{
    "name"   : "Juan Pachanga",
    "email"  : "juanup@gmail.com",
    "balance": 300000
}
```

Para registrar una orden

```json
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
```

Para agregar dinero

```json
{
    "to"     : 1,
    "amount" : 100000
}
```

Para transferir entre personas

```json
{
    "from"   : 2,
    "to"     : 1,
    "amount" : 120000
}
```