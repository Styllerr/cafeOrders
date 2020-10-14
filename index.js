const express = require('express');
// const request = require('request-promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname + '/pub')));

let db;

const url = 'mongodb://localhost:27017';
const dbname = "cafeOrders";
const client = new MongoClient(url);

app.get('/', (req, res) => {
    res.sendFile('index.html')
});
app.get('/tasks', (req, res) => {
    db.collection('tasks').find().toArray((err, docs) => {
        if (err) {
            console.error(err);
            return sendStatus(500);
        }
        
        res.send(docs);
        // console.log(docs);
    })
})
app.post('/addTask', (req, res) => {
    console.log(req.body);
    db.collection('tasks').insertOne(req.body, err => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
});

client.connect(err => {

    console.log('Connection success...');
    db = client.db(dbname);
    app.listen(3000, () => console.log('Server running...'));
});