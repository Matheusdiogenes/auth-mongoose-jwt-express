require('dotenv').config()
const express = require('express')
const routes = require('./app/routes')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        sobre: "API de autenticação e criação de produto com MongoDB.",
        autor: "Matheus diogenes"
    })
})

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`App listening on http://localhost:${process.env.PORT}`)
})
