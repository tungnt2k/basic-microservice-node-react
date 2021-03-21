const express = require('express')
const crypto = require('crypto')


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const commentByPostId = {}

app.get('/posts/:id/comments',(req, res)=>{
    res.send(commentByPostId[req.params.id])
})

app.post('/posts/:id/comments',(req, res)=>{
    const id = crypto.randomBytes(4).toString('hex')
    const {content} = req.body

    comments = commentByPostId[req.params.id] || []

    comments.push({id, content});

    commentByPostId[req.params.id] = comments;

    res.status(201).send({id,content})
})


app.listen(5000,()=>{
    console.log('App was listion on port 5000');
})