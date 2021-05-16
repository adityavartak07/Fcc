const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var exerSchema = new Schema({
  
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }

    
        
},{
    timestamps:true
})

var logSchema = new Schema({
    id:{
        type:String,
        required:true

    },
    username:{
        type:String,
        required:true

    },
    log:[exerSchema]
   

    
        
},{
    timestamps:true
})
const Log=mongoose.model('Log',logSchema);
const Exercise=mongoose.model('Exercise',exerSchema)

module.exports.Log=Log;
module.exports.Exercise=Exercise;