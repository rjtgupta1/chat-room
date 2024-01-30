const mongoose = require('mongoose');
const schema = mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},
{
    versionKey:false,
})

const userData = mongoose.model('userData',schema);
module.exports = userData;