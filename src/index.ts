import * as fastify from 'fastify'
import * as fastifyBlipp from 'fastify-blipp'
import { Server, IncomingMessage, ServerResponse } from 'http'
import routes from './routes'
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: true,
})

server.register(fastifyBlipp)
server.register(routes)

const start = async () => {
    try {
        await server.listen(3000)
        server.blipp()
    } catch (err) {
        console.log(err)
        server.log.error(err)
        process.exit(1)
    }
}

process.on('uncaughtException', (error) => {
    console.error(error)
})
process.on('unhandledRejection', (error) => {
    console.error(error)
})
start()
