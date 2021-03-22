const express = require('express');
const axios = require('axios');


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/events', (req, res)=>{

    const event = req.body;

    axios.post('http://localhost:3002/events', event)
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:5000/events', event)


    res.send({status: 'OK'})
})

app.listen(3001,()=>{
    console.log('App was listen on port 3001');
})