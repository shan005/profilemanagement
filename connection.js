const mongoose = require('mongoose')
const express = require('express')
const uri = require('./config/key').mongoURL

const port = 9020
const conn = express();



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', function () {
    console.log('connection has been made');

}).on('error', function (error) {
    console.log('error is :', error);
})

conn.use(express.json())

const routes = require('./data/routes/routes')
conn.use('/ProfileManagement', routes)



conn.listen(port, function () {
    console.log(`server started on port ${port}`);
})

