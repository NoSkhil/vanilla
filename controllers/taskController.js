const Task = require('../models/taskModel')

const { getPostData } = require('../utils')

async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(tasks))
    } catch (error) {
        console.log(error)
    }
}

async function getTask(req, res, id) {
    try {
        const task = await Task.findById(id)

        if(!task) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Task Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(task))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createTask(req, res) {
    try {
        const body = await getPostData(req)
        const { description } = JSON.parse(body)

        const task = {
            description,
            createdAt: new Date()
        }

        const newTask = await Task.create(task)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newTask))  

    } catch (error) {
        console.log(error)
    }
}

async function updateTask(req, res, id) {
    try {
        const task = await Task.findById(id)

        if(!task) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Task Not Found' }))
        } else {
            const body = await getPostData(req)

            const { description } = JSON.parse(body)

            const taskData = {
                description: description || task.description,
            }

            const updTask = await Task.update(id, taskData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updTask)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

async function deleteTask(req, res, id) {
    try {
        const task = await Task.findById(id)

        if(!task) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Task Not Found' }))
        } else {
            await Task.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Task ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}