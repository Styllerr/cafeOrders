const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, 'client', 'build')));

let db;

const url = process.env.MONGODB_URI || 'mongodb+srv://anonymous:9Ldpcu4CH7ASfdjA@cluster0.ex11l.mongodb.net/cafeOrders?retryWrites=true&w=majority';
const dbname = "cafeOrders";
const client = new MongoClient(url, { useUnifiedTopology: true });


/////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/waiters', (req, res) => {
    db.collection('waiters').find().toArray((err, docs) => {
        if (err) {
            console.error(err);
            return sendStatus(500);
        }
        res.send(docs);
    })
})
app.post('/api/waiters', (req, res) => {
    let waiter = req.body
    db.collection('waiters').insertOne(waiter, err => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(waiter);
    })
});
app.put('/api/waiters/:id', (req, res) => {
    let waiter = req.body;
    delete waiter._id;
    db.collection('waiters').updateOne({ _id: ObjectID(req.params.id) }, { $set: waiter }, (err, result) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        waiter._id = req.params.id;
        res.send(waiter);
    })
});
app.delete('/api/waiters/:id', (req, res) => {
    db.collection('waiters').deleteOne({ _id: ObjectID(req.params.id) }, (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(req.params.id);
    })
});
/////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/orders', (req, res) => {
    db.collection('orders').find().toArray((err, docs) => {
        if (err) {
            console.error(err);
            return sendStatus(500);
        }
        res.send(docs);
    })
})
app.post('/api/orders', (req, res) => {
    let order = req.body
    db.collection('orders').insertOne(order, err => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(order);
    })
});
app.put('/api/orders/:id', (req, res) => {
    let order = req.body;
    delete order._id;
    db.collection('orders').updateOne({ _id: ObjectID(req.params.id) }, { $set: order }, (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        order._id = req.params.id
        res.send(order);
    })
});
app.delete('/api/orders/:id', (req, res) => {
    db.collection('orders').deleteOne({ _id: ObjectID(req.params.id) }, (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(req.params.id);
    })
});
/////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/dishes', (req, res) => {
    db.collection('dishes').find().toArray((err, docs) => {
        if (err) {
            console.error(err);
            return sendStatus(500);
        }
        res.send(docs);
    })
})
app.post('/api/dishes', (req, res) => {
    let dishe = req.body
    db.collection('dishes').insertOne(dishe, err => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(dishe);
    })
});
app.put('/api/dishes/:id', (req, res) => {
    let dishe = req.body;
    delete dishe._id;
    db.collection('dishes').updateOne({ _id: ObjectID(req.params.id) }, { $set: dishe }, (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        dishe._id = req.params.id
        res.send(dishe);
    })
});
app.delete('/api/dishes/:id', (req, res) => {
    db.collection('dishes').deleteOne({ _id: ObjectID(req.params.id) }, (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(req.params.id);
    })
});
/////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/menuSections', (req, res) => {
    db.collection('menuSections').find().toArray((err, docs) => {
        if (err) {
            console.error(err);
            return sendStatus(500);
        }
        res.send(docs);
    })
})
app.post('/api/menuSections', (req, res) => {
    let menuSection = req.body
    db.collection('menuSections').insertOne(menuSection, err => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(menuSection);
    })
});
app.put('/api/menuSections/:id', (req, res) => {
    let menuSection = req.body;
    delete menuSection._id;
    db.collection('menuSections').updateOne({ _id: ObjectID(req.params.id) }, { $set: menuSection }, (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        menuSection._id = req.params.id
        res.send(menuSection);
    })
});
app.delete('/api/menuSections/:id', (req, res) => {
    db.collection('menuSections').deleteOne({ _id: ObjectID(req.params.id) }, (err) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(req.params.id);
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

client.connect(err => {
    console.log('Connection success...');
    db = client.db(dbname);
    app.listen(PORT, () => console.log(`Server running at the port ${PORT} ...`));
});