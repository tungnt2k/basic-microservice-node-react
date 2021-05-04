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

    comments.push({id, content, status: 'pending'});

    commentByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events',{
        type: 'CommentCreated',
        data:{
            commentId: id, content, status: 'pending', postId: req.params.id 
        }
    })


    res.status(201).send({id,content, status: 'pending'})
})

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);


    const { type, data} = req.body;

    switch (type) {
        case 'CommentModerated': {
            const { commentId, content, postId, status} = data

            const comments = commentByPostId[postId]

            commentByPostId[postId] = comments.map((comment)=> {
                if(comment.id === commentId) {
                    comment.status = status
                }
                return comment;
            })


            axios.post('http://event-bus-srv:4005/events', {
                type: 'CommentUpdated',
                data: {
                    commentId,
                    content,
                    postId,
                    status
                }
            })

        }
            break;

    }

    res.send({});
})


app.listen(4001,()=>{
    console.log('App was listion on port 4001');
})