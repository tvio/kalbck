"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function log(kdo, co, text) {
    try {
        const ret = await db_1.default.instance.save(text);
        return ret;
    }
    catch (err) {
        console.log('chyba ' + err);
        return err;
    }
}
exports.log = log;
//# sourceMappingURL=log.js.map