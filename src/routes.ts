//import * as fastify from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function test(fastify, opts): Promise<void> {
    fastify.get('/status', async function (req, reply) {
        const pepek = 'to jsem ja'
        const user = { user: pepek }
        // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
        console.log('response:', JSON.stringify(user))
        reply.send(user)
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function test2(fastify, opts): Promise<void> {
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
}
