"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const fastifyBlipp = require("fastify-blipp");
const fastifySwagger = require("fastify-swagger");
const path = require("path");
const routes_1 = require("./routes");
const db_1 = require("./db");
const settings_1 = require("./settings");
const server = fastify({
    logger: { prettyPrint: true },
});
const optsSwagger = {
    mode: 'static',
    specification: {
        path: path.join(__dirname, '../openapi.yaml'),
        postProcessor: function (swaggerObject) {
            return swaggerObject;
        },
    },
    exposeRoute: true,
    routePrefix: '/kal',
};
server.register(routes_1.default);
server.register(fastifySwagger, optsSwagger);
server.register(fastifyBlipp);
const start = async () => {
    try {
        await db_1.default.connect(settings_1.default.postgresql);
        await db_1.default.mon();
        await server.listen(3001);
        server.blipp();
    }
    catch (err) {
        console.log(err);
        server.log.error(err);
        process.exit(1);
    }
};
process.on('uncaughtException', (error) => {
    console.error(error);
});
process.on('unhandledRejection', (error) => {
    console.error(error);
});
start();
exports.default = server;
//# sourceMappingURL=index.js.map