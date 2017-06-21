//lower level library that doesn't do as much as mongoose
//but instead acts as raw interactions with the database
//ala typing stuff into the command line
var mongojs = require('mongojs');

var db = mongojs('wam_ejs');

module.exports = {
    findAll: findAll,
    create: create
};

function create(collectionName, data) {
    var deferred = q.defer();


}

function findAll(collectionName, filter) {
    var deferred = q.defer();

    var collection = db.collection(collectionName);
    collection.find(filter, function(err, response) {
        if(err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(response);
        }
    });

    return deferred.promise;
}