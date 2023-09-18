// import { createServer } from 'node:http'
// const server = createServer((req, res)=>{
//     res.write('Hello World!!!') 
//     res.end()
// })
// server.listen(3333)

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'


const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.get('/', () => {
    return 'Hello World!!!'
})


server.get('/videos', async (req) => {
    const search = req.query.search
    const videos = await database.list(search)
    return videos
})

server.post('/videos', async  (req, res) => {
    const { title, description, duration } = req.body
    await database.create({ title, description, duration })
    return res.status(201).send()
})


server.put('/videos/:id', async  (req, res) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body
    await database.update(videoId, { title, description, duration })
    return res.status(204).send()
})

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id
    await database.delete(videoId)

    return res.status(204).send()
})


const port = { port: process.env.PORT ?? 3333 }

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port.port}`) 
})


