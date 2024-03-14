import type { Model } from 'mongoose'
import { User } from './user.type'

export type Task = {
    id?: string
    title: string
    description: string
    status: string
    createdAt?: Date
    lastModified?: Date
    endIn?: Date
    user: User
}

export type TaskModel = Model<Task>