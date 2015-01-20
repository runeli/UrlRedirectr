var
    http = require('http'),
    url = require('url'),
    UrlHelper = require('./js/UrlHelper.js'),
    qs = require('querystring'),
    DB = require('./js/DB.js'),
    db = new DB();


var server = http.createServer(function (req, res) {
    var requestPath = url.parse(req.url).pathname.substring(1);


    //ROUTE: POST /shorten
    if (req.method === 'POST' && requestPath === 'shorten') {

        var dataBody = '';

        //Get all posted data
        req.on('data', function (part) {
            dataBody += part;
        });

        //Process the request when all the data has been received
        req.on('end', function () {

            //Parse the received body
            var query = qs.parse(dataBody);
            var urlHelper = new UrlHelper(query.link);


            //Checks if posted `link` indeed has a valid URI 
            if (urlHelper.prependHttp().isValid()) {

                res.writeHead(200, urlHelper.getHead('plain'));

                //db.set() returns the given argument after pushing it to the database
                return res.end(db.set(urlHelper.url).toString());

            } else {

                res.writeHead(404, urlHelper.getHead('plain'));
                return res.end('`link` not a valid URI');

            }
        });


    //ROUTE: GET /{id}
    } else if (req.method === 'GET' && !isNaN(requestPath)) {

        var urlHelper = new UrlHelper(db.get(requestPath));
        
        //Found ID in the database
        if (urlHelper.isValid()) {
            
            res.writeHead(301, urlHelper.getHead());
            return res.end();
        //ID does not exist in the database
        } else {

            res.writeHead(404, urlHelper.getHead('plain'));
            return res.end('id not found');

        }

    //ROUTE: GET /CV show CV if requested
    } else if (requestPath === 'CV') {

        var urlHelper = new UrlHelper('http://runeli.github.io/CV');

        res.writeHead(301, urlHelper.getHead());
        return res.end();

    //ROUTE: GET /
    } else {
    

        //Starting page
        var urlHelper = new UrlHelper();
        res.writeHead(200, urlHelper.getHead('plain'));
        return res.end('For API, see: https://github.com/runeli/UrlRedirectr');

    }

});


server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');