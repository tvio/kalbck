import * as fastify from 'fastify'
import * as fastifyBlipp from 'fastify-blipp'
import * as fastifySwagger from 'fastify-swagger'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as path from 'path'
import * as routes from './routes'
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true },
})
const optsSwagger = {
    mode: 'static',
    specification: {
        path: path.join(__dirname, 'openapi.yaml'),
        postProcessor: function (swaggerObject): void {
            return swaggerObject
        },
    },
    exposeRoute: true,
    routePrefix: '/',
}

server.register(fastifyBlipp)
server.register(routes.test, routes.test2)
server.register(fastifySwagger, optsSwagger)

const start = async (): Promise<void> => {
    try {
        await server.listen(3001)
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

export default server
