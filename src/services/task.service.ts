import Tasks from '../models/task.model'
import { Task, TaskModel } from '../types/task.type'
import boom from '@hapi/boom'

class TaskService {
  async create(task: Task) {
    const newTask = await Tasks.create(task).catch((error) => {
      console.log('Could not save task', error)
    })
    
    return newTask
  }

  async findAll() {
    const tasks = await Tasks.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!tasks) {
      throw boom.notFound('There are not tasks')
    }

    return tasks
  }

  async findById(id: string) {
    const tasks = await Tasks.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!tasks) {
      throw boom.notFound('Task not found')
    }

    return tasks
  }

  async findByName(title: string) {
    const tasks = await Tasks.findOne({ title }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!tasks) {
      throw boom.notFound('Task not found')
    }
  }
}

export default TaskService
