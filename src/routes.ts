import * as fastify from 'fastify'
import { getHeapCodeStatistics } from 'v8'
// import * as fp from 'fastify-plugin'

// export default fastify.route(async (server, opts, next) => {
//     server.route({
//         url: '/status',
//         logLevel: 'warn',
//         method: ['GET'],
//         handler: async (request, reply) => {
//             return reply.send({ date: new Date(), works: true })
//         },
//     })
//     next()
// })//proc je log 3x?
export default async function first(fastify, opts) {
    fastify.get('/status', (req, reply) => {
        const user = { user: 'to jsem ja' }
        req.log.info(user)
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        reply.send(user)
    })
}
