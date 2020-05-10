import db from './db'

export async function log(kdo: string, co: string, text: string): Promise<object | string> {
    try {
        const ret = await db.instance.save(text)
        return ret
    } catch (err) {
        console.log('chyba ' + err)
        return err
    }
}
