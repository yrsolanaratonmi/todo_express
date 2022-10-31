const Task = require('../../db/models/task/index')

module.exports.getAllTasks = (req, res) => {
  try {
    Task.find().then(result => {
      res.send(result)
    })
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }
}

module.exports.createNewTask = (req, res) => {
  try {
    if (typeof req.body.isCheck === 'boolean' &&
        req.body.text &&
        typeof req.body.text === 'string') {
      const task = new Task({text: req.body.text, isCheck: req.body.isCheck})
      task.save()
          .then(result => res.send(result))
    } else res.status(400).send('uncorrected data')
  } catch (error) {
    res.status(500).send(`server error : ${error}`)
  }

}

module.exports.changeTaskInfo = (req, res) => {
  try {
    if (typeof req.body.isCheck === 'boolean' &&
        req.body.text &&
        typeof req.body.text === 'string') {
      Task.findByIdAndUpdate(req.body.id, {text: req.body.text, isCheck: req.body.isCheck})
          .then(result => res.send(result))
    } else res.status(400).send('uncorrected data')
  } catch (error) {
    res.status(500).send(`error : ${error}`)
  }


}

module.exports.deleteTask = (req, res) => {
  try {
    Task.findByIdAndDelete({_id: req.query.id})
        .then(result => res.send(result))
  } catch (error) {
    res.status(500).send(`error : ${error}`)
  }

}