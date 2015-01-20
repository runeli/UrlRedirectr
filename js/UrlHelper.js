var validUrl = require('valid-url');

//Argument: ´String´ containing an url or an ´Object´ containing a field for ´url´ {url:'http://reaktor.fi/'}
function UrlHelper(url) {
    
    if (typeof url === 'string' && url.length > 0) {
        this.url = url;
        this.prependHttp();

    } else if (typeof url === 'object' && url.url !== 'undefined') {  
        this.url = url.url;
        this.prependHttp();

    } else {
        this.url = undefined;
    }

}

UrlHelper.prototype.isValid = function () {
    //isUri returns a string if given argument is an URI, undefined otherwise
    
    return typeof validUrl.isUri(this.url) === 'string';
}

UrlHelper.prototype.getHead = function (type) {

    if (type === 'location' || typeof type === 'undefined') {
        return { 'Location': this.prependHttp().url };
    } else if (type === 'plain') {
        return { 'Content-Type': 'text/plain' };
    }
}

UrlHelper.prototype.prependHttp = function () {

    //Checks if this.url begins with 'http://' or 'https://'
    if (!validUrl.isWebUri(this.url)) {
        this.url = 'http://' + this.url;
    }

    return this;
}

module.exports = UrlHelper;