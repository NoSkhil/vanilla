let tasks = require('../data/tasks')
const crypto = require("crypto"); // Using this in place of UUID

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(tasks)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const task = tasks.find((p) => p.id === id)
        resolve(task)
    })
}

function create(task) {
    return new Promise((resolve, reject) => {
        const id = crypto.randomBytes(16).toString("hex");

        const newProduct = {id, ...task}
        tasks.push(newProduct)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/tasks.json', tasks);
        }
        resolve(newProduct)
    })
}

function update(id, task) {
    return new Promise((resolve, reject) => {
        const index = tasks.findIndex((p) => p.id === id)
        tasks[index] = {id, ...task}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/tasks.json', tasks);
        }
        resolve(tasks[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        tasks = tasks.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/tasks.json', tasks);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}