function DB(name) {
    this.name = name;
    this.KeyValuePairStore = [];
    this.lastKey = 0;
}

var method = DB.prototype;

method.set = function (url) {

    var key = ++this.lastKey;
    this.KeyValuePairStore.push({id: key, url: url});
    return key;

}

method.get = function (key) {

    return this.KeyValuePairStore.filter(function (pair) {
        return pair.id === parseInt(key, 10);
    })[0];

}

module.exports = DB;