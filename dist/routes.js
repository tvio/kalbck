"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const moment = require("moment");
// import * as fp from 'fastify-plugin'
//TODO - strakonovani
//TODO - preokontrolovat vsechny routy , udelat celkovej disconnect, dodelat do return body vsude data
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function default_1(fastify, opts) {
    fastify.get('/kal/dny', async function (req, reply) {
        //const ret = await db.instance.kal.dny.find({})
        //const ret = await db.instance.query('select * from kal.dny')
        const ret = await db_1.default.instance.query('select version();');
        //const log = await log('GET /kal/dny')
        for (const i in ret) {
            ret[i].datum = moment(ret[i].datum).format('DD.MM.YYYY');
        }
        console.log('response:', JSON.stringify(ret));
        return ret;
    });
    fastify.put('/kal/dny', async function (req, reply) {
        const inp = await db_1.default.instance.kal.dny.update({ datum: req.body.datum }, {
            den: req.body.den,
            pozn1: req.body.pozn1,
            pozn2: req.body.pozn2,
            pozn3: req.body.pozn3,
            ss: req.body.ss,
        });
        console.log('response:', JSON.stringify(reply));
        return reply.status;
    });
    fastify.post('/kal/dny', async function (req, reply) {
        try {
            const inp = await db_1.default.instance.kal.dny.insert(req.body);
            // shows: { user: 'My serializer father - call father  serializer', key: 'another key' }
            console.log('response:', JSON.stringify(inp));
            return reply.status;
        }
        catch (e) {
            console.log(e);
        }
    });
    fastify.get('/kal/dny/:datum', opts, async function (req, reply) {
        //const datum = moment(req.params.datum, 'YYYY-MM-DD')
        //console.log('fromatovane datum', datum)
        try {
            const sql = `to_char(datum,'YYYY-MM-DD')='${req.params.datum}'`;
            const ret = await db_1.default.instance.kal.dny.where(sql);
            ret[0].datum = moment(ret[0].datum).format('DD.MM.YYYY');
            console.log('response:', ret[0]);
            return ret[0];
        }
        catch (err) {
            console.log('Err ' + err);
            //  db.disconnect()
            return err;
        }
    });
    // problem s formatovanim data  nebo where ???
    fastify.get('/kal/dny/:datum/lastChat', opts, async function (req, reply) {
        try {
            //  const sql = `denid in (select id from kal.dny where to_char(datum,'YYYY-MM-DD')='${req.params.datum}') order by id desc`
            const den = '2020-06-14';
            const sql = `denid in (select id from kal.dny where to_char(datum,'YYYY-MM-DD')='${den}') order by id desc`;
            const ret = await db_1.default.instance.kal.chaty.where(sql);
            ret[0].datum = moment(ret[0].datum).format('DD.MM.YYYY HH24:24:SS');
            console.log('response:', ret[0]);
            return ret[0];
        }
        catch (err) {
            console.log('Err ' + err);
            //   db.disconnect()
            return err;
        }
    });
    // necraci nic, problem  s where??
    fastify.get('/kal/dny/:datum/chaty', opts, async function (req, reply) {
        try {
            const sql = `denid in (select id from kal.dny where to_char(datum,'YYYY-MM-DD')='${req.params.datum}')  order by id desc`;
            const ret = await db_1.default.instance.kal.chaty.where(sql);
            for (const i in ret) {
                ret[i].datum = moment(ret[i].datum).format('DD.MM.YYYY HH24:24:SS');
            }
            console.log('response:', ret);
            return ret;
        }
        catch (err) {
            console.log('Err ' + err);
            //   db.disconnect()
            return err;
        }
    });
    fastify.put('/kal/chaty', opts, async function (req, reply) {
        try {
            const inp = await db_1.default.instance.kal.chaty.update(req.body.id, { datum: req.body.datum, text: req.body.text });
            console.log('response:', inp);
            return inp;
        }
        catch (err) {
            console.log('Err ' + err);
            //db.disconnect()
            return err;
        }
    });
    fastify.post('/kal/chaty', opts, async function (req, reply) {
        try {
            const inp = await db_1.default.instance.kal.chaty.insert(req.body);
            console.log('response:', JSON.stringify(inp));
            return inp;
        }
        catch (err) {
            console.log('Err ' + err);
            //  db.disconnect()
            return err;
        }
    });
    // fastify.get('/kal/chaty/:denid', opts, async function (req, reply) {
    //     try {
    //         console.log(req.params.denid)
    //         const ret = await db.instance.chaty.find({ denid: req.params.denid })
    //         for (const i in ret) {
    //             ret[i].datum = moment(ret[i].datum).format('DD.MM.YYYY HH24:MM:SS')
    //         }
    //         console.log('response:', JSON.stringify(ret))
    //         return ret
    //     } catch (err) {
    //         console.log('Err ' + err)
    //         //db.disconnect()
    //         return err
    //     }
    // })
    // nemam osetrene null - vyhodi chybu na datum v prazdnem objektu
    fastify.get('/kal/chaty/:id', opts, async function (req, reply) {
        try {
            console.log(req.params.id);
            const ret = await db_1.default.instance.kal.chaty.find({ id: req.params.id });
            ret[0].datum = moment(ret[0].datum).format('DD.MM.YYYY HH24:MM:SS');
            console.log('response:', JSON.stringify(ret[0]));
            return ret[0];
        }
        catch (err) {
            console.log('Err ' + err);
            //db.disconnect()
            return err;
        }
    });
    fastify.delete('/kal/chaty/:id', opts, async function (req, reply) {
        try {
            const ret = await db_1.default.instance.kal.chaty.destroy({ id: req.body.Id });
            console.log('response:', JSON.stringify(ret));
            return ret;
        }
        catch (err) {
            console.log('Err ' + err);
            //  db.disconnect()
            return err;
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map