"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
async function first(fastify, opts) {
    fastify.get('/status', (req, reply) => {
        const user = { userx: 'to jsem ja' };
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        reply.log.info('response:', JSON.stringify(user));
        reply.send(user);
    });
}
exports.default = first;
//# sourceMappingURL=routes.js.map