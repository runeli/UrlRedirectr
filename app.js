var http = require('http');
var url = require('url');
var UrlHelper = require('./js/UrlHelper.js')
var qs = require('querystring');
var DB = require('./js/DB.js');
var db = new DB();


var server = http.createServer(function (req, res) {
    var requestPath = url.parse(req.url).pathname.substring(1);
    

    //POST /shorten
    if (req.method === 'POST' && requestPath === 'shorten') {
        var query = qs.parse(url.parse(req.url).query);
        var urlHelper = new UrlHelper(query.link);

        res.writeHead(200, urlHelper.getHead('plain'));
        
        if (urlHelper.isValid()) {

            //db.set() returns the given argument after pushing it to the database
            return res.end(db.set(urlHelper.prependHttp().url).toString());
        }

    //GET /{id}
    } else if (req.method === 'GET' && !isNaN(requestPath)) {

        var urlHelper = new UrlHelper(db.get(requestPath));
        
        if (urlHelper.isValid()) {
            
            res.writeHead(301, urlHelper.getHead());
            return res.end();

        }

    //show CV if requested
    } else if (requestPath === 'CV') {

        var urlHelper = new UrlHelper('http://runeli.github.io/CV');

        res.writeHead(301, urlHelper.getHead());
        return res.end();

    }

    //404 NOT FOUND
    var urlHelper = new UrlHelper();
    res.writeHead(404, urlHelper.getHead('plain'));
    return res.end('id not found');

});


server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');