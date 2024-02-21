import type { Model } from 'mongoose'

export type Task = {
    id?: string
    title: string
    description: string
    status: string
}

export type TaskModel = Model<Task>