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

const handleEvent = (type, data) => {
    switch (type) {
        case 'PostCreated': {
            const {id, title} = data
            posts[id] = {
                id,
                title,
                comments: []
            }    
        }
            break;
        case 'CommentCreated':{
            const { commentId, content, status, postId} = data;

            const post = posts[postId];

            post.comments.push({id: commentId, content, status})
        }
            break;
        
        case 'CommentUpdated':{
            const { commentId, content, status, postId} = data;


            const post = posts[postId]
            const comment = post.comments.find((comment) => comment.id === commentId)

            comment.status = status
            comment.content = content
        }
            break;

    }
}

app.post('/events', (req, res)=>{
    
    handleEvent(req.body.type, req.body.data)

    console.log(posts);

    res.send({})
})

app.listen(4002,async ()=>{
    console.log('App was listen on port 4002');

    const response = await axios.get('http://localhost:4005/events')

    for(let event of response.data) {
        console.log(`Handle event ${event.type}`);
        handleEvent(event.type, event.data)
    }

})