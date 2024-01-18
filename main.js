const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const photoRoute=require('./photosupload-Route')



const app = express();
port = 8500
url=('mongodb://localhost:27017/uploadPhotos')
app.use(express.json());

app.listen(port,()=>{
    console.log('port 8500')
})

mongoose
.connect(url)
.then(()=>{
    console.log('db connected');
})
.catch(()=>{
    console.log('db not connected');
})

app.use(cors())

let corsOptions ={
    origin:['http://localhost:8500']
};

app.use("/",cors(corsOptions))
app.use('/photo',photoRoute)
