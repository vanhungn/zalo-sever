const mongoose = require('mongoose')
const schema= mongoose.Schema

const modelUsers= new schema({
    nameUser:{type: String},
    avatar:{type:String},
    bgrImg:{type:String},
    gender:{type:String},
    birthday:{type:Date},
    phone:{type:String},
    password:{type:String},
    friend:[{type:mongoose.Types.ObjectId,ref:'users'}]
},
{ timestamps: true },
{ collection: 'users' }
)

module.exports=mongoose.model('users',modelUsers)