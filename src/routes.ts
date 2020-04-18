import * as fastify from 'fastify'
import db from './db'
import { request } from 'http'
// import * as fp from 'fastify-plugin'

// const opts: fastify.RouteShorthandOptions = {
//     schema: {
//         params: {
//             type: 'object',
//             id: {
//                 type: 'integer',
//             },
//         },
//     },
// }

// export default fp (async (server,  opts, next) =>{
//     server.get('/status/:id', async function (req, reply) {
//         const pepek = 'to jsem ja'
//         const user = { user: pepek }
//         // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
//         console.log('response:', JSON.stringify(user))
//         reply.send(req.params.id)
//     })
// }
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function (fastify, opts) {
    fastify.get('/kal/dny', async function (req, reply) {
        const user = {
            id: 555,
            kdo: 'Turbous',
            datum: '2019-04-10',
            den: 'Ne',
            pozn1: 'Msaterman',
            pozn2: 'Lumik',
            pozn3: 'Pfff',
        }
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(user))
        reply.send(user)
    })

    fastify.put('/kal/dny', async function (req, reply) {
        const user = {
            id: 555,
            kdo: 'Turbous',
            datum: '2019-04-10',
            den: 'Ne',
            pozn1: 'Msaterman',
            pozn2: 'Lumik',
            pozn3: 'Pfff',
        }
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(user))
        reply.send(user)
    })

    fastify.post('/kal/dny', async function (req, reply) {
        const user = {
            id: 555,
            kdo: 'Turbous',
            datum: '2019-04-10',
            den: 'Ne',
            pozn1: 'Msaterman',
            pozn2: 'Lumik',
            pozn3: 'Pfff',
        }
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(user))
        reply.send(user)
    })

    fastify.get('/kal/dny/:id', opts, async function (req, reply) {
        const ret = await db.instance.dny.findOne({ id: req.params.id })
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(ret))
        reply.send(ret)
    })

    fastify.get('/kal/dny/{id}/chaty', async function (req, reply) {
        const user = {
            id: 555,
            kdo: 'Turbous',
            datum: '2019-04-10',
            den: 'Ne',
            pozn1: 'Msaterman',
            pozn2: 'Lumik',
            pozn3: 'Pfff',
        }
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(user))
        reply.send(user)
    })
}
