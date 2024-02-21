import express from 'express'
import { Task } from '../types/task.type'
import TaskService from '../services/task.service'

const router = express.Router()
const service = new TaskService()

router.post('/', async (req, res) => {
  const task: Task = req.body
  const newTask = await service.create(task)

  res.status(201).json(newTask)
})

router.get('/', async (req, res, next) => {
  try {
    const task = await service.findAll()
    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const task = await service.findById(req.params.id)
    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const task = await service.findById(req.query.title as string)
    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
})

export default router