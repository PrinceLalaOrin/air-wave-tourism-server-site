const express = require('express');
const { MongoClient } = require('mongodb');
const objectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');


const { config } = require('dotenv');
const app = express();



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uo4fp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);
async function run () {
     try{
         await client.connect();
         const database = client.db('trip');
         const itemsCollection = database.collection('items');

        //  GET Packages API
       app.get('/items', async(req,res)=>{
           const allData = itemsCollection.find({});
           const items = await allData.toArray();
           res.send(items);
       })

        // Get Single Service API
        app.get('/items/:id', async(req,res)=> {
            const id = req.params.id;
            const query = {_id: objectId(id)};
            const item = await itemsCollection.findOne(query);
            res.json(item);

        })
     }
     finally{
        //  await client.close();
     }
}

run().catch(console.dir);



app.get('/', (req,res)=>{
    res.send('Your server is running')
});

app.listen(port, ()=>{
    console.log('Running server on Port :', port)
});

