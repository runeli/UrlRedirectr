var http = require('http');
var url = require('url');
var qs = require('querystring');
var DB = require('./js/DB.js');
var db = new DB();


var server = http.createServer(function (req, res) {
    var requestPath = url.parse(req.url).pathname.substring(1);
    

    //POST /shorten
    if (req.method === 'POST' && requestPath === 'shorten') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        var query = qs.parse(url.parse(req.url).query);
        if (query.link) {
            return res.end(db.set(query.link).toString());
        }

    //GET /{id}
    } else if (req.method === 'GET' && !isNaN(requestPath)) {

        var keyUrlPair = db.get(requestPath);
        
        if (keyUrlPair != undefined) {
            var redirectUrl = keyUrlPair.url;

            //Add http:// if missing e.g. 'www.google.com' -> 'http://www.google.com'
            if (redirectUrl.substring(0, 7) != 'http://' && redirectUrl.substring(0, 8) != 'https://' ) {

                redirectUrl = 'http://' + redirectUrl;

            }

            res.writeHead(301, { 'Location': redirectUrl });
            return res.end();

        }

    //show CV if requested
    } else if (requestPath === 'CV') {
        res.writeHead(301, { 'Location': 'http://runeli.github.io/CV' });
        return res.end();

    }

    //404 NOT FOUND
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('id not found');
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');