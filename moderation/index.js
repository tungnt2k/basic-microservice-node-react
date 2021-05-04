const express = require('express');
const axios = require('axios');


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/events', async (req, res)=>{

    const { type, data} = req.body;

    switch (type) {
        case 'CommentCreated': {
            const { commentId, content, postId} = data
            const status = content.includes('orange') ? 'reject' : 'approved';

            await axios.post('http://event-bus-srv:4005/events', {
                type: 'CommentModerated',
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

    res.send({})
})

app.listen(4003,()=>{
    console.log('App was listen on port 4003');
})