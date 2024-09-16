const express = require('express')
const app = express()
const PORT = 3000

require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const router = require('./view/routes')
app.use(router);

require('./server/postgres/postgres').connection()


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
