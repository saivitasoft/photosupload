const express = require('express')
const route = express.Router();
const upload = require("./photosupload-Model")
const cors = require('cors')
const multer = require('multer')




const storage = multer.diskStorage({
  destination: 'photo/',
  filename : (req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname);
  },
});

const uploads=multer({storage})

let corsOptions={
    origin:['http://localhost:6500']
}
  
// singleimages


route.post('/uploadphoto',cors(corsOptions),uploads.single('file'),async(req, res) => {

   if(!req.file){
    return res.status(400).json({error:'nofile'})
   }
   var data= {
    totalamount:req.body.totalamount,
    image:req.file.filename
   }
       
   try{
    const images = await upload.create(data)
    return res.status(200).json(images)
   }
   catch(err){
    return res.status(500).json({err})
   }
});

// multiimages

route.post('/allphotos',cors(corsOptions),uploads.array('file'),async(req, res) => {
  if(!req.files){
   return res.status(400).json({error:'nofile'})
  }

const filenames =req.files.map(file  => file.filename);

  var data= {
   totalamount:req.body.totalamount,
   image1:filenames
  }
      
  try{
   const images = await upload.create(data)
   return res.status(200).json(images)
  }
  catch(err){
   return res.status(500).json({err})
  }
});
  
 module.exports = route;