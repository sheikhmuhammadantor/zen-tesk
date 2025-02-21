require('dotenv').config({ path: '.env.local' });
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const morgan = require('morgan');

const port = process.env.PORT || 4000
const app = express()

// middleware
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://zenaction.netlify.app'
    ],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

async function run() {
    try {
        const userCollection = client.db("ZenAction").collection("Users");
        const taskCollection = client.db("ZenAction").collection("Tasks");

        app.post('/users', async (req, res) => {
            // const user = req.body;
            // const query = { email: user.email }
            const query = { email: req.query.email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne({ ...query, role: 'donor', status: 'active' });
            res.send(result);
        });

        // task post on db
        app.post('/tasks', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello from ZenAction Server...')
})

app.listen(port, () => {
    console.log(`ZenAction is running on port ${port}`)
})
