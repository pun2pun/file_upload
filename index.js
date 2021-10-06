const express = require("express")
const multer = require('multer')
const database = require('./Helpers/database')
const config = require('./config.json')
const cors = require('cors')

const app = express()
const PORT = config.server.PORT;

app.use(express.json())
app.use(cors())
app.use(multer({
    dest:'./Documents',
}).any());



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
    
})

app.get('/all/document', database.getDocumentList)
app.get('/get/document',(req,res) =>{
    res.download(__dirname+'/Documents/6a4fac40e75f85346392880633963a35'+".png")
})

app.post('/file/upload',database.upLoadFile)


app.listen(PORT,() =>{
    console.log("SERVER IS RUNNING ON PORT ",PORT)
})

