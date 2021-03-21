const express = require('express')
const crypto = require('crypto')


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const posts = {}

app.get('/posts',(req, res)=>{
    res.send(posts)
})

app.post('/posts',(req, res)=>{
    const id = crypto.randomBytes(4).toString('hex')
    const {title} = req.body

    posts[id] = {
        id, title
    }

    res.status(201).send(posts[id])
})


app.listen(4000,()=>{
    console.log('App was listion on port 4000');
})