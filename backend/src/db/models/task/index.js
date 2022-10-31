const mongoose = require('mongoose')

const taskScheme = new mongoose.Schema({
  text: String,
  isCheck: Boolean
})

module.exports = Task = mongoose.model('tasks', taskScheme)