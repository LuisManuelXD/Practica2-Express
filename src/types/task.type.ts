import type { Model } from 'mongoose'

export type Task = {
    id?: string
    title: string
    description: string
    status: string
    createdAt?: Date
    lastModified?: Date
    endIn?: Date
}

export type TaskModel = Model<Task>