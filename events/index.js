const express = require('express');
const axios = require('axios');


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/events', (req, res)=>{

    const event = req.body;

    axios.post('http://localhost:3000', event)
    axios.post('http://localhost:4000', event)
    axios.post('http://localhost:5000', event)


    res.send({status: 'OK'})
})

app.listen(3001,()=>{
    console.log('App was listen on port 3001');
})