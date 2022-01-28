const express = require('express')

const PORT = 5001;

const app = express();

app.use(express.json())

app.post('/',(req,res)=> {
    console.log(req.body);
    res.status(200).json('Server Works.')
})

app.listen(PORT,()=>console.log('SERVER STARTED ON PORT ' + PORT))