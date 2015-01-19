var assert = require('assert');
var UrlHelper = require('../js/UrlHelper.js');
var DB = require('../js/DB.js');



describe('UrlHelper tests', function () {



    it('Should not be valid', function () {
        var u = new UrlHelper("asdfasdf");
        assert(u.isValid());
    });

    it('Should be valid', function () {
        var u = new UrlHelper("reaktor.fi");
        assert(u.isValid());
    });

    it('Should be valid', function () {
        var u = new UrlHelper('http://reaktor.fi');
        assert(u.isValid());
    });

    it('Should generate equal 301 header', function () {
        var u = new UrlHelper('http://reaktor.fi');
        assert.deepEqual(u.getHead(), {'Location' : 'http://reaktor.fi' });
    });

    it('Should generate equal 301 header', function () {
        var u = new UrlHelper('http://reaktor.fi');
        assert.deepEqual(u.getHead('location'), { 'Location': 'http://reaktor.fi' });
    });

    it('Should generate text/plain header', function () {
        var u = new UrlHelper('http://reaktor.fi');
        assert.deepEqual(u.getHead('plain'), { 'Content-Type': 'text/plain' });
    });

    it('Should prepend http://', function () {
        var u = new UrlHelper("reaktor.fi");
        u.isValid();
        assert.equal(u.url, 'http://reaktor.fi');
    });

    


});

describe('DB tests', function () {



    it('Should set and get values to the temporary DB', function () {
        var db = new DB();
        var id = db.set('someUrl');

        assert.equal(db.get(id).url, 'someUrl');
        
    });

    it('should get an url from an db object', function () {
        var db = new DB();
        var id = db.set('someUrl');
        var uh = new UrlHelper(db.get(id));

        assert.equal(uh.url, 'someUrl');

    });


});