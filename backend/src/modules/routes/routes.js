const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  deleteTask
} = require('../controllers/task.controller')

router.get('/allTasks', getAllTasks)
router.post('/task', createNewTask)
router.patch('/task', changeTaskInfo)
router.delete('/task', deleteTask)

module.exports = router