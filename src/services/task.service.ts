import { ObjectId } from 'mongoose'
import Tasks from '../models/task.model'
import { Task, TaskModel } from '../types/task.type'
import boom from '@hapi/boom'

class TaskService {
  async create(task: Task, userId: ObjectId) {
    const newTask = await Tasks.create({ ...task, user: userId }).catch(
      (error) => {
        console.log('Could not save task', error)
      }
    )

    const existingTask = await this.findById((newTask as any)._id)

    return existingTask.populate([{ path: 'user', strictPopulate: false }])
  }

  async findAll(filters: Partial<Task>) {
    const tasks = await Tasks.find(filters)
      .populate([{ path: 'user', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!tasks) {
      throw boom.notFound('There are not tasks')
    }

    return tasks
  }

  async findById(id: string) {
    const task = await Tasks.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!task) {
      throw boom.notFound('Task not found')
    }

    return task
  }

  async findByName(title: string) {
    const task = await Tasks.findOne({ title }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!task) {
      throw boom.notFound('Task not found')
    }
  }

  async deletedById(id: string) {
    const task = await Tasks.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!task) {
      throw boom.notFound('Task not found')
    }

    await task.deleteOne()

    return task
  }

  // async updateById(id: string, newTask: Partial<Task>) {
  //   const task = await Tasks.findById(id).catch((error) => {
  //     console.log('Error while connecting to the DB', error)
  //   })

  //   if (!task) {
  //     throw boom.notFound('Category not found')
  //   }

  //   Object.assign(task, newTask);
  //   await task.save();

  //   return task
  // }

  async updateById(id: string, newTask: Partial<Task>) {
    const task = await Tasks.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!task) {
      throw boom.notFound('Update task not found')
    }

    Object.assign(task, newTask)
    await task.save()

    return newTask
  }
}

export default TaskService
