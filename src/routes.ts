import * as fastify from 'fastify'
import db from './db'
import { request } from 'http'
import * as moment from 'moment'

// import * as fp from 'fastify-plugin'
// TODO Udelat upravu pro remote a local dny.find a kal.dny.find
//TODO - strakonovani pro dny a chaty/lastchaty

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function (fastify, opts) {
    fastify.get('/kal/dny', async function (req, reply) {
        //pro local dny.find pro remote kal.dny.find
        const ret = await db.instance.dny.find({})
        //const ret = await db.instance.query('select * from kal.dny')
        //const ret = await db.instance.query('select version();')
        //const log = await log('GET /kal/dny')
        for (const i in ret) {
            ret[i].datum = moment(ret[i].datum).format('DD.MM.YYYY')
        }
        console.log('response:', JSON.stringify(ret))
        return ret
    })

    fastify.put('/kal/dny', async function (req, reply) {
        const inp = await db.instance.dny.update(
            { datum: req.body.datum },
            {
                den: req.body.den,
                pozn1: req.body.pozn1,
                pozn2: req.body.pozn2,
                pozn3: req.body.pozn3,
                ss: req.body.ss,
            },
        )
        inp[0].datum = moment(inp[0].datum).format('DD.MM.YYYY')
        console.log('response:', JSON.stringify(inp))
        return inp
    })

    fastify.post('/kal/dny', async function (req, reply) {
        try {
            const inp = await db.instance.dny.insert(req.body)
            // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
            console.log('response:', JSON.stringify(inp))
            return reply.status
        } catch (e) {
            console.log(e)
        }
    })

    fastify.get('/kal/dny/:datum', opts, async function (req, reply) {
        //const datum = moment(req.params.datum, 'YYYY-MM-DD')
        //console.log('fromatovane datum', datum)
        try {
            const sql = `to_char(datum,'DD.MM.YYYY')='${req.params.datum}'`
            const ret = await db.instance.dny.where(sql)
            ret[0].datum = moment(ret[0].datum).format('DD.MM.YYYY')
            console.log('response:', ret[0])
            return ret[0]
        } catch (err) {
            console.log('Err ' + err)
            //  db.disconnect()
            return err
        }
    })
    // problem s formatovanim data  nebo where ???
    fastify.get('/kal/dny/:datum/lastChat', opts, async function (req, reply) {
        try {
            //  const sql = `denid in (select id from kal.dny where to_char(datum,'YYYY-MM-DD')='${req.params.datum}') order by id desc`
            const den = '2020-06-14'
            const sql = `denid in (select id from kal.dny where to_char(datum,'DD.MM.YYYY')='${req.params.datum}') order by id desc`
            const ret = (await db.instance.chaty.where(sql)) || []
            if (ret.length > 0) {
                ret[0].datum = moment(ret[0].datum).format('DD.MM.YYYY')
                console.log('response:', ret[0])
                return ret[0]
            } else {
                return ret
            }
        } catch (err) {
            console.log('Err ' + err)
            //   db.disconnect()
            return err
        }
    })
    // prepsat aby nevracelo 500 kdyz neni chat v danem dni
    fastify.get('/kal/dny/:datum/chaty', opts, async function (req, reply) {
        try {
            // const sql = `denid in (select id from kal.dny where to_char(datum,'DD.MM.YYYY')='${req.params.datum}')  order by id desc`
            const sql = `denid in (select id from kal.dny where to_char(datum,'DD.MM.YYYY')='${req.params.datum}')  order by id desc`
            const ret = (await db.instance.chaty.where(sql)) || []
            if (ret.length > 0) {
                for (const i in ret) {
                    ret[i].datum = moment(ret[i].datum).format('DD.MM.YYYY')

                    console.log('response:', ret)
                    return ret
                }
            } else {
                return ret
            }
        } catch (err) {
            console.log('Err ' + err)
            //   db.disconnect()
            return err
        }
    })

    fastify.put('/kal/chaty', opts, async function (req, reply) {
        try {
            const inp = await db.instance.chaty.update(req.body.id, { datum: req.body.datum, text: req.body.text })
            console.log('response:', inp)
            return inp
        } catch (err) {
            console.log('Err ' + err)
            //db.disconnect()
            return err
        }
    })

    fastify.post('/kal/chaty', opts, async function (req, reply) {
        try {
            const inp = await db.instance.chaty.insert(req.body)
            inp.datum = moment(inp.datum).format('DD.MM.YYYY')
            console.log('response:', JSON.stringify(inp))
            return inp
        } catch (err) {
            console.log('Err ' + err)
            //  db.disconnect()
            return err
        }
    })
    fastify.get('/kal/chaty/:denid', opts, async function (req, reply) {
        try {
            console.log(req.params.denid)
            const ret = await db.instance.chaty.find({ denid: req.params.denid })
            for (const i in ret) {
                ret[i].datum = moment(ret[i].datum).format('DD.MM.YYYY')
            }
            console.log('response:', JSON.stringify(ret))
            return ret
        } catch (err) {
            console.log('Err ' + err)
            //db.disconnect()
            return err
        }
    })

    // fastify.get('/kal/chaty/:id', opts, async function (req, reply) {
    //     try {
    //         console.log(req.params.id)
    //         const ret = await db.instance.chaty.find({ id: req.params.id })
    //         ret[0].datum = moment(ret[0].datum).format('DD.MM.YYYY HH24:MM:SS')
    //         console.log('response:', JSON.stringify(ret[0]))
    //         return ret[0]
    //     } catch (err) {
    //         console.log('Err ' + err)
    //         //db.disconnect()
    //         return err
    //     }
    // })
    fastify.delete('/kal/chaty/:id', opts, async function (req, reply) {
        try {
            const ret = await db.instance.chaty.destroy({ id: req.body.Id })

            console.log('response:', JSON.stringify(ret))
            return ret
        } catch (err) {
            console.log('Err ' + err)
            //  db.disconnect()
            return err
        }
    }),
        fastify.get('/kal/chaty/lastchat', opts, async function (req, reply) {
            try {
                const sql = 'select a.* from kal.chaty a where a.id=(select max(id) from kal.chaty where a.denId=denId)'
                const ret = (await db.instance.query(sql)) || []
                if (ret.length > 0) {
                    for (const i in ret) {
                        ret[i].datum = moment(ret[i].datum).format('DD.MM.YYYY')

                        console.log('response:', ret)
                        return ret
                    }
                } else {
                    return ret
                }
            } catch (err) {
                console.log('Err ' + err)
                //   db.disconnect()
                return err
            }
        })
}
