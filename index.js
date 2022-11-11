const express=require('express');
const app=express();
require('dotenv').config()
const cors=require('cors');
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
app.use(cors())
app.use(express.json());


const uri = "mongodb+srv://Mamun:wa9QNJuPHd8hMwau@cluster0.zjt9pxe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      await client.connect();
      const rating=client.db("Food-service").collection("rating");
      const dbserve = client.db("Food-service").collection("service");
      const discount_item=client.db("Food-service").collection("Discount");
     

      
      app.get('/service',async(req,res)=>{
        const query={};
        const result=dbserve.find(query);
        const services=await result.toArray();
        res.send(services);
      })
      app.get('/service/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const result=await dbserve.findOne(query);
        
        res.send(result);
      })
      app.get('/discount',async(req,res)=>{
        const query={};
        const result=discount_item.find(query);
        const discounts=await result.toArray();
        res.send(discounts);
      })
      app.get('/discount/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const result=await discount_item.findOne(query);
        
        res.send(result);
      })
      app.get('/found',async(req,res)=>{
        const result = await rating.find( { value: { $gt: 2 } } ).toArray();
        res.send(result)
      })
      app.post('/ratingus',async(req,res)=>{
        const result = await rating.insertOne(req.body)
        res.json(result)
        
      })



      // create a document to insert
      
      // app.post('/user',async (req,res)=>{
      //   const newuser=req.body; 
      //   console.log("adding new user",newuser);
        
      //   const result= await database.insertOne(newuser)
      //   res.send(result)
      // })
      // app.get('/users',async(req,res)=>{
      //   const query={}
      //   const cursor=database.find(query)
      //   const users=await cursor.toArray();
      //   res.send(users)
      // })
      // //delete
      // app.delete('/user/:id',async(req,res)=>{
      //   id=req.params.id;
      //   const query={_id:ObjectId(id)};
      //   const result=await database.deleteOne(query);
      //   res.send(result);
      // })
      // app.put('/user/:id',async(req,res)=>{
      //   const id=req.params.id
      //   const updateduser=req.body;
      //   const filter={_id:ObjectId(id)}
      //   const options={upsert:true};
      //   const updateddoc={
      //     $set:{
      //       name:updateduser.name,
      //       email:updateduser.email
      //     }
      //   }
      //   const result=await database.updateOne(filter,updateddoc,options)
      //   res.send(result)
      // })
      // //update

      // app.get('/user/:id',async(req,res)=>{
      //   const id=req.params.id;
      //   const query={_id:ObjectId(id)};
      //   const result=await database.findOne(query)
      //   res.send(result);
      // })

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('hi')
})

// username:foodhutserver
//password:wxG2uhfMXUrckWBV
//link:https://cloud.mongodb.com/v2/6361621008c727314dd8df6f#clusters
app.listen(port,()=>{
    console.log("Port is connected")
})