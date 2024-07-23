const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/Users')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const URL ="mongodb+srv://gyanyadav:LmAtaBavFVUEJmsh@clustercrud.c22ad5y.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCrud"

app.get('/api/Users', async (req,res)=>{
    try {
        const allusers = await User.find({});
        res.status(200).json(allusers)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/api/User/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const singleUser = await User.findById(id);
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/api/Users', async (req,res)=>{
    try {
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.put('/api/User/:id', async (req,res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id,req.body)
        if(!user){
            return res.status(404).json({message:"Product not found"})
        }
        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.delete('/api/User/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id,req.body)
        if(!user) {
            return res.status(404).json({message:"User not found"})
        }
        else  return res.status(200).json({message:"User Deleted"})
    } catch (error) {
        return res.json(500).json({message:error.message})
    }
})

mongoose.connect(URL)
.then(()=>{
    console.log("MongoDB Connected")
    app.listen(3000, ()=> console.log("server is running on 3000"))
})
.catch(err => console.log(err))