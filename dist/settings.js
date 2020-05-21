"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = Promise.resolve().then(() => require('path'));
const qs = Promise.resolve().then(() => require('qs'));
const env = process.env.NODE_ENV || 'dev';
const cenv = require("custom-env");
cenv.env(env);
const settings = { env };
settings.log = {
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.LOG_PRETTY === 'true',
};
// settings.fastify = {
//     querystringParser: (str: string) => qs.parse(str),
// }
settings.port = process.env.PORT;
settings.postgresql = {
    host: process.env.PG_HOST || '127.0.0.1',
    port: process.env.PG_PORT || 5439,
    database: process.env.PG_DB || 'kal',
    user: process.env.PG_USER || 'kal',
    password: process.env.PG_PASSWORD || 'test',
};
settings.server = {
    port: process.env.APP_PORT || 3001,
    host: '0.0.0.0',
};
// settings.services = [
//     path.join(__dirname, '../services/index'),
//     path.join(__dirname, '../services/poi'),
//     path.join(__dirname, '../services/events'),
// ]
//settings.plugins = [path.join(__dirname, '../plugins/documentation')]
settings.monitor = {
    sql: true,
};
exports.default = settings;
//# sourceMappingURL=settings.js.map