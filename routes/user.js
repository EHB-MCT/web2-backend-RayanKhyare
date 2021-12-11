const express = require('express').Router;
const app = express();
const {
    MongoClient,
    ObjectId
} = require('mongodb');

const dbName = "courseProject";
const User = require('./User.js')

const url = "mongodb+srv://admin:admin@cluster0.t4a9d.mongodb.net/$courseProject?retryWrites=true&w=majority";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get('/', async (req, res) => {
    try {
        await client.connect()
        const colli = client.db(dbName).collection('users')
        const clngs = await colli.find({}).toArray()

        res.status(200).json(clngs)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'something went wrong',
            value: error
        })
    } finally {
        await client.close()
    }
})

app.post('/', async (req, res) => {
    try {

        const db = client.db(dbName);
        const col = db.collection("users");
        console.log("Connected correctly to server");

        await client.connect();

        let user = new User(req.body.firstname, req.body.lastname, req.body.email, req.body.password)

        res.status(200).send('succesfully uploaded')

        const p = await col.insertOne(user);

        const myDoc = await col.findOne();

        console.log(myDoc);
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
})

app.get('/:id', async (req, res) => {
    try {
        await client.connect()
        const db = client.db(dbName);
        const col = db.collection("users");

        const query = {
            _id: ObjectId(req.params.id)
        }

        const clngs = await col.findOne(query)

        res.status(200).json(clngs)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'something went wrong',
            value: error
        })
    } finally {
        await client.close()
    }
})


app.delete('/:id', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("users");

        const query = {
            _id: ObjectId(req.params.id)
        }
        const userDelete = await col.deleteOne(query)
        res.status(200).send(userDelete);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'error',
            value: error
        });
    }
})

module.exports = app;