const express = require('express')
const app = express()
const port = process.env.NODE_PORT || 8080

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
})