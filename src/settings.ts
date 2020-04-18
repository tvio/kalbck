const path = import('path')
const qs = import('qs')
const env = process.env.NODE_ENV || 'dev'

require('custom-env').env(env)

/**
 * Application settings
 * @typedef {Object} Settings
 * @property {Object} log - pino logger options, @see https://getpino.io/#/docs/api?id=loggerlevels-object
 * @property {Object} fastify - fastify options, @see https://www.fastify.io/docs/latest/Server
 * @property {Object} server - server network settings
 * @property {string} server.port - server port
 * @property {string} server.host - server host
 * @property {string[]} services - paths to services
 * @property {string[]} plugins - paths to plugins
 */

const settings: any = { env }

settings.log = {
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.LOG_PRETTY === 'true',
}

// settings.fastify = {
//     querystringParser: (str: string) => qs.parse(str),
// }

settings.postgresql = {
    host: process.env.PG_HOST || '127.0.0.1',
    port: process.env.PG_PORT || 5433,
    database: process.env.PG_DB || 'kal',
    user: process.env.PG_USER || 'kal',
    password: process.env.PG_PASSWORD || 'test',
}

settings.server = {
    port: process.env.APP_PORT || 3001,
    host: '0.0.0.0',
}

// settings.services = [
//     path.join(__dirname, '../services/index'),
//     path.join(__dirname, '../services/poi'),
//     path.join(__dirname, '../services/events'),
// ]

//settings.plugins = [path.join(__dirname, '../plugins/documentation')]

settings.monitor = {
    sql: true,
}
export default settings
