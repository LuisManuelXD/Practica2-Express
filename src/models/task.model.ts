import { Schema, model } from 'mongoose'
import { Task, TaskModel } from '../types/task.type'
import { USER_REFERENCE } from './user.model'

export const TASK_REFERENCE = 'Task'

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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_REFERENCE
  }
})

export default model(TASK_REFERENCE, Tasks)