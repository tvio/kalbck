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
        const ret = await db.instance.dny.find()
        console.log('response:', JSON.stringify(ret))
        return ret
    })

    fastify.put('/kal/dny', async function (req, reply) {
        const inp = await db.instance.dny.save({ datum: req.body.datum }, req.body)
        console.log('response:', JSON.stringify(reply))
        return reply.status
    })

    fastify.post('/kal/dny', async function (req, reply) {
        const inp = await db.instance.dny.insert(req.body)
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(req.body))
        return reply.status
    })

    fastify.get('/kal/dny/:datum', opts, async function (req, reply) {
        const ret = await db.instance.dny.findOne({ datum: req.params.datum })
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(ret))
        return ret
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
