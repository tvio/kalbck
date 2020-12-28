import * as fastify from 'fastify'
import * as fastifyBlipp from 'fastify-blipp'
import * as fastifySwagger from 'fastify-swagger'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as path from 'path'
import routes from './routes'
import db from './db'
import settings from './settings'
import * as fastifyCors from 'fastify-cors'
import { log } from './log'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true },
})
const optsSwagger = {
    mode: 'static',
    specification: {
        path: path.join(__dirname, '../openapi.yaml'),
        postProcessor: function (swaggerObject): void {
            return swaggerObject
        },
    },
    exposeRoute: true,
    routePrefix: '/kal',
}
//pak cors zmenit a dat na true
server.register(fastifyCors, {
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,POST,PUT',
    allowedHeaders: [
        'Access-Control-Allow-Headers',
        'Origin,Accept',
        'X-Requested-With',
        'Content-Type',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
    ],
    // ],
    // credentials: true,
    // preflightContinue: true,
    // maxAge: 86400,
})
server.register(routes)
server.register(fastifySwagger, optsSwagger)
server.register(fastifyBlipp)

const start = async (): Promise<void> => {
    try {
        await db.connect(settings.postgresql)
        await db.mon()

        await server.listen(settings.port, settings.hostname)
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
