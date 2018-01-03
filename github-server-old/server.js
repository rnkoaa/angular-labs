const config = require('./config');
const restify = require('restify');


/**
 * Initialize Server
 */
const server = restify.createServer({
    name: config.name,
    url: config.hostname,
    version: config.version,
});


/**
 * Middleware
 */
server.use(restify.plugins.jsonBodyParser({
    mapParams: true
}));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser({
    mapParams: true
}));
server.use(restify.plugins.fullResponse());

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

server.get('/hello/:name', (req, res, next) => {
    res.send('hello ' + req.params.name);
    next();
});
// server.head('/hello/:name', respond);

// register routes
require('./routes')(server);

server.listen(config.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});
