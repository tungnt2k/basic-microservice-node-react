const express = require('express')
const crypto = require('crypto')
const cors = require('cors');
const axios = require('axios')

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const commentByPostId = {}

app.get('/posts/:id/comments',(req, res)=>{
    res.send(commentByPostId[req.params.id])
})

app.post('/posts/:id/comments',async (req, res)=>{
    const id = crypto.randomBytes(4).toString('hex')
    const {content} = req.body

    comments = commentByPostId[req.params.id] || []

    comments.push({id, content});

    commentByPostId[req.params.id] = comments;

    await axios.post('http://localhost:3001/events',{
        type: 'CommentCreated',
        data:{
            commentId: id, content, postId: req.params.id 
        }
    })


    res.status(201).send({id,content})
})

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);

    res.send({});
})


app.listen(5000,()=>{
    console.log('App was listion on port 5000');
})