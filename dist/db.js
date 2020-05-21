"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/class-name-casing */
const massive = require("massive");
const monitor = require("pg-monitor");
// const options = {
//     query(e) {
//         /* do some of your own processing, if needed */
//         log('kdo', 'co', e)
//         monitor.query(e) // monitor the event;
//         console.log(e)
//     },
//     error(err, e) {
//         /* do some of your own processing, if needed */
//         log('kdo', 'co', err)
//         monitor.error(err, e) // monitor the event;
//         console.log(err + e)
//     },
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class db {
}
db.connect = async function (settings) {
    db.instance = await massive({
        host: settings.host,
        port: settings.port,
        database: settings.database,
        user: settings.user,
        password: settings.password,
        ssl: false,
        poolSize: settings.pool || 10,
    });
    //console.log(db.instance.driverConfig)
};
//asi neni potreba vubec resit
db.disconnect = async function () {
    db.instance.instance.$pool.end();
};
db.mon = async function () {
    monitor.attach(db.instance.driverConfig);
};
exports.default = db;
//# sourceMappingURL=db.js.map