import express from 'express'
import { Task } from '../types/task.type'
import TaskService from '../services/task.service'
import passport from 'passport'
import { JwtRequestType } from '../types/user.type'
import { ObjectId } from 'mongoose'

const router = express.Router()
const service = new TaskService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res) => {
    // const sub = req.user.sub
    const {
      user: { sub }
    } = req
    const task: Task = req.body
    const newTask = await service.create(
      task,
      sub as unknown as ObjectId
    )

    res.status(201).json(newTask)
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res, next) => {
    try {
      const { user } = req
      console.log(user)
      const filters: Partial<Task> = req.query
      const tasks = await service.findAll(filters)
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const task = await service.findById(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const task = await service.findById(req.query.title as string)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const task = await service.deletedById(req.params.id)
      res.status(204).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const newtask: Task = req.body
      const task = await service.updateById(req.params.id, newtask)
      res.status(204).json(task)
    } catch (error) {
      next(error)
    }
  }
)

export default router
