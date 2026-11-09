import express from 'express';
import cors from 'cors'
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());




const client = new MongoClient(process.env.MONGO_DB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}



const mongoClient = await connectToMongoDB();
const database = mongoClient.db('my-portfolio');
const projectCollection = database.collection('projects')


app.get('/projects', async (req, res) => {
  const result = await projectCollection.find({}).toArray()
  res.send(result);
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});