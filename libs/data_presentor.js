var Promise = require("bluebird"),
    Datastore = require('nedb'),
    dbFile = process.cwd() + '/db/test.db',
    db = new Datastore({ filename: dbFile, autoload: true }),
    _ = Promise.promisifyAll(require('underscore-node'));

function DataPresentor(){

}

DataPresentor.streams = function(cb){
  var scope = this;

  return DataPresentor.find().then(function(records) {
    scope.streams_data = records;
    return _.pluck(records, 'streamId');
  }).then(function(records){
    return _.uniq(records);
  })
};


DataPresentor.find = function(){
  var scope = this;

  return new Promise(function(resolve, reject) {
    // use cached values
    if (!_.isEmpty(scope.streams_data)){
      resolve(scope.streams_data);
    } else {
      db.find({}, function(err, records){
        resolve(records);
      });
     }
  });
};

module.exports = DataPresentor;
