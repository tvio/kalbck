"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const fastifyBlipp = require("fastify-blipp");
const routes_1 = require("./routes");
const server = fastify({
    logger: true,
});
server.register(fastifyBlipp);
server.register(routes_1.default);
const start = async () => {
    try {
        await server.listen(3000);
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
//# sourceMappingURL=index.js.map