const momgoose = require('mongoose');

const upload = new momgoose.Schema({

    amount:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    image1:{
        type:Array,
        require:[],
    }

},{
    timestamps:true
});


module.exports= momgoose.model('upload',upload)