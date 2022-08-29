const express = require('express')
const cors = require('cors')
const fs = require('fs');

const server = express();

const port = 3010

server.use(express.json({}))

server.use(cors())

// server.use(express.static('public', {
//     extensions: ['html']
// }))

server.get('/load', (req, res) => {
    fs.readFile('./store.json', 'utf8', (err, data) => {
        res.send(data)
    })
})

server.post('/save', (req, res) => {
    fs.writeFile('./store.json', JSON.stringify(req.body), {}, () => {return true})
})

server.listen(port, err => console.log(err || `JSON data server running on Port ${port}`));