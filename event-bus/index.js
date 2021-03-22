const express = require('express');
const axios = require('axios');


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const events = []

app.get('/events', (req, res) => {
    res.send(events)
})

app.post('/events', (req, res)=>{

    const event = req.body;

    events.push(event)

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4003/events', event)
    axios.post('http://localhost:4001/events', event)


    res.send({status: 'OK'})
})

app.listen(4005,()=>{
    console.log('App was listen on port 4005');
})