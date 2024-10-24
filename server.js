import {fastify} from 'fastify';
import { DataBaseMemory } from './database-memory.js';


const server= fastify();
const database = new DataBaseMemory();

server.post('/videos', (request, reply)=>{

    const {title, description, duration} = request.body; 

    database.create({
        title,
        description,
        duration,
    })

    console.log(database.list());

    return reply.status(201).send();
})

server.get('/videos', (request)=>{
    const search = request.query.search;

    const videos = database.list(search);
    
    return videos;
})

server.put('/videos/:id', (request, reply)=>{
    const videosId = request.params.id;
    
    const {title, description, duration} = request.body; 

    database.update(videosId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send();
})

server.delete('/videos/id', (request, reply)=>{
    const videosId = request.params.id;

    database.delete(videosId);

    return reply.status(204).send();
})


server.get('/', ()=> {
    return 'Hello World!'
})

server.listen({
    port:3333,
});