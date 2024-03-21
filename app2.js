
const http = require('http');
const routes = require('./routes');

console.log(route.someText);
const server = http.createServer(routes);
server.listen(3000);

