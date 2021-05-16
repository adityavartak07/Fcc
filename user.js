const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        required:true
    }
        
})
const Users=mongoose.model('User',UserSchema);

module.exports=Users;