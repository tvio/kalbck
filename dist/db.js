"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/class-name-casing */
const massive = require("massive");
const monitor = require("pg-monitor");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class db {
    constructor() {
        this.monitor = function () {
            monitor.attach(db.instance.instance.driverConfig, ['query', 'error']);
        };
    }
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
};
db.disconnect = async function () {
    db.instance.instance.$pool.end();
};
exports.default = db;
//# sourceMappingURL=db.js.map