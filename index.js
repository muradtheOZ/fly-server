const express = require('express')
const cors = require('cors')
const ObjectId = require("mongodb").ObjectID
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://admin:admin123456@cluster0.bejzy.mongodb.net/fruitydb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express()
const port = 5000;
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

client.connect(err => {
  const collection = client.db(process.env.DB_NAME).collection("fruits");
  const userCollection = client.db(process.env.DB_NAME).collection("ordered");
  const stationCollection = client.db("fruitydb").collection("station")



app.get('/products',(req,res)=>{
 collection.find({})
  .toArray((err,document)=>{
      
      res.send(document)
  })
})


//new------------------------------------//

app.get('/allStation',(req,res)=>{
    stationCollection.find({})
    .toArray((err,document)=>{
        // console.log('one',document);
        res.send(document)
    })
  })

  app.patch('/update/:id',(req,res)=>{

    var updateObject = req.body.bookingInfo;
  stationCollection.updateOne({_id:ObjectId(req.params.id)},
      {
      $set: {isbooked: updateObject},
      $currentDate: { lastModified: true } 
    })

    .then(res =>{
        console.log("Hello",res)
    })
   
  })





//new end 



});




app.listen(port)