/* eslint-disable @typescript-eslint/class-name-casing */
import * as massive from 'massive'
import * as monitor from 'pg-monitor'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class db {
    static instance: any
    static connect = async function (settings) {
        db.instance = await massive({
            host: settings.host,
            port: settings.port,
            database: settings.database,
            user: settings.user,
            password: settings.password,
            ssl: false,
            poolSize: settings.pool || 10,
        })
    }
    static disconnect = async function () {
        db.instance.instance.$pool.end()
    }
    monitor = function () {
        monitor.attach(db.instance.instance.driverConfig, ['query', 'error'])
    }
}
export default db
