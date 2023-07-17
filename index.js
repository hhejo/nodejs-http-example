const http = require('http');

const server = http.createServer();
server.on('request', (request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request
    .on('error', () => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      // body = Buffer.concat(body).toString();
      response.on('error', (err) => {
        console.error(err);
      });
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      // response.writeHead(200, {'Content-Type': 'application/json'});
      const responseBody = { headers, method, url, body };
      response.write(JSON.stringify(responseBody));
      response.end();
      // response.end(JSON.stringify(responseBody));
    });
});

server.listen(3000, '127.0.0.1', () => {});
