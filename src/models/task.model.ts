import { Schema, model } from 'mongoose'
import { Task, TaskModel } from '../types/task.type'

const Tasks = new Schema<Task, TaskModel>({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    required: false,
    trim: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  },
  endIn: {
    type: Date,
    trim: true
  }
})

export default model('Task', Tasks)