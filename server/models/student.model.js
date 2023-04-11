const mongoose = require('mongoose')

const Student=new mongoose.Schema(
    {
        studentid:{type:String,required:true,unique:true},
        firstname:{type:String,required:true},
        lastname:{type:String,required:true},
        middlename:{type:String,required:true},
        course:{type:String,required:true},
        year:{type:String,required:true},
    },
    {collection:'student-data'}
)


const model=mongoose.model('StudentData',Student)
module.exports = model