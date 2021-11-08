const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const dataDocOBJID = '61892eebc924e3427058148c';
const DB_URI = 'mongodb+srv://admin:1234@cluster0.swfhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT || '5000';

app.use(require('cors')());

app.post('/getData', (req, res)=>{
    MongoClient.connect(DB_URI, (error, client)=>{
        if(error)console.error(error);
        const db = client.db('main');
        db.collection('data').findOne({_id: ObjectId(dataDocOBJID)}).then(response=>{
            console.log(response);
            client.close();
            response._id=undefined;
            res.send(response);
        }).catch(err=>console.error(err));
    })
});

app.listen(port);