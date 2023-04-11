const express= require('express')
const app = express()  
const cors= require('cors')
const mongoose = require('mongoose')
const User=require('./models/user.model')
const jwt=require('jsonwebtoken')
const Student=require('./models/student.model')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/sampleApp')

//Show User Data
app.get('/api/data',async(req,res)=>{
    try{
        const data=await User.find({})
        res.send(data)
        console.log(data)
    }catch(err){
        console.log(err)
    }
})


//Show Student Data
app.get('/api/studentdata',async(req,res)=>{
    try{
        const studentdata=await Student.find({})
        res.send(studentdata)
        console.log(studentdata)
    }catch(err){
        console.log(err)
    }
})
//Student Data
app.post('/api/student', async(req,res) =>{
    console.log(req.body)
    try{
        await Student.create({
            studentid: req.body.studentid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            middlename: req.body.middlename,
            course: req.body.course,
            year: req.body.year,
        })
        res.json({ status: 'ok'})
    }catch(err){
        res.json({status:'error', error:'ID Number already exist'})
    }
})



//Register
app.post('/api/register', async (req,res) => {
    console.log(req.body)
        try{
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    res.json({ status: 'ok'})
    } catch(err){
        res.json({status:'error', error:'Duplicate email'})
    }

})

//Login
app.post('/api/login', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if(user)
    {
     const token=jwt.sign
     (
        {
            name:user.name,
            email:user.email,
            
        },
        'secret..!..'
     )
     return res.json({status: 'ok',user:token})
    }
    else
    {
        return res.json({status: 'ok', user:false}  )
    }
  
})

app.listen(1337, () => {
    console.log('Server starts at 1337')
})