var validUrl = require('valid-url');

//Argument: ´String´ containing an url or an ´Object´ containing a field for ´url´ {url:'http://reaktor.fi/'}
function UrlHelper(url) {
    if (typeof url === 'string') {
        this.url = url;
    } else if (typeof url !== 'undefined' && url.url !== 'undefined') {
        this.url = url.url;
    } else {
        this.url = undefined;
    }

}

UrlHelper.prototype.isValid = function () {
    return validUrl.isUri(this.prependHttp().url);
}

UrlHelper.prototype.getHead = function (type) {

    if (type === 'location' || typeof type === 'undefined') {
        return { 'Location': this.prependHttp().url };
    } else if (type === 'plain') {
        return { 'Content-Type': 'text/plain' };
    }
}

UrlHelper.prototype.prependHttp = function () {
    if (this.url.substring(0, 7) !== 'http://' && this.url.substring(0, 8) !== 'https://') {
        this.url = 'http://' + this.url;
    }
    return this;
}

module.exports = UrlHelper;