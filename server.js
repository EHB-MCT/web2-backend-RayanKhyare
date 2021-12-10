const {
    MongoClient,
    ObjectId
} = require('mongodb');



const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');

const cors = require('cors');
const {
    query
} = require('express');

require('dotenv').config()

const dbName = "courseProject";

const port = process.env.PORT || 3000;

const url = "mongodb+srv://admin:admin@cluster0.t4a9d.mongodb.net/$courseProject?retryWrites=true&w=majority";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(300).redirect('/public/info.html')
})

app.get('/users', async (req, res) => {
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

})

app.put('/', async (req, res) => {

})



app.delete('/', async (req, res) => {

})



app.delete('/', async (req, res) => {

})

app.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
})