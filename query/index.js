const express = require('express');
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())

const posts = {}

app.get('/posts', (req, res)=>{
    res.send(posts)
})


app.post('/events', (req, res)=>{
    switch (req.body.type) {
        case 'PostCreated': {
            const {id, title} = req.body.data
            posts[id] = {
                id,
                title,
                comments: []
            }    
        }
            break;
        case 'CommentCreated':{
            const { commentId, content, postId} = req.body.data;

            const post = posts[postId];

            post.comments.push({id: commentId, content})
        }
            break;

    }

    console.log(posts);

    res.send({})
})

app.listen(3003,()=>{
    console.log('App was listen on port 3003');
})