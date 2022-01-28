import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Post from './post.js';
const DB_URL = 'mongodb+srv://vasylchuk:admin@cluster0.ybkcz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()
const port = 3001
app.use(cors())
app.use(express.json())
app.post('/send', async (req, res) => {
    console.log(req.body);
const {author, title, content, picture} = req.body;
const post = await Post.create({author, title, content, picture})
  res.status(200).send('Done')
})
app.get('/getAll', async (req,res)=>{
    const find = await Post.find()
    res.status(200).send(find)
})

async function startApp() {
   try {
    await mongoose.connect(DB_URL) 
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
   } catch (e) {
       
   } 
}

startApp();