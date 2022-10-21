const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())


const taskScheme = new mongoose.Schema({
  text: String,
  isCheck: Boolean
})

const uri = 'mongodb+srv://rbarannikitrum:restart987@cluster0.lzarcb4.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {useNewURLParser: true, useUnifiedTopology: true})

const Task = mongoose.model('tasks', taskScheme)

app.post('/createTask', (req, res) => {
  const task = new Task(req.body)
  task.save().then(result => res.send(result))
})

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send(result)
  })
})

app.patch('/updateTask', (req, res) => {
  Task.findByIdAndUpdate(req.body.id, req.body).then(result => res.send(result))
})

app.delete('/deleteTask', (req, res) => {
  Task.findByIdAndDelete({_id: req.query.id}).then(result => res.send(result))
})


app.listen(8000, () => {
  console.log('hello')
})
