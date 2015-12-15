var Promise = require("bluebird"),
    Datastore = require('nedb'),
    broadcastDbFile = process.cwd() + '/db/broadcast.db',
    broadcastDb = new Datastore({ filename: broadcastDbFile, autoload: true }),
    EventDbFile = process.cwd() + '/db/event.db',
    eventDb = new Datastore({ filename: EventDbFile, autoload: true }),
    _ = Promise.promisifyAll(require('underscore-node'));

function BroadcastDataProvider(){

}

BroadcastDataProvider.broadcasts = function(){
  var scope = this;

  return BroadcastDataProvider.find({}).then(function(records) {
    scope.broadcasts_data = records;
    return _.map(records, function(record){
      return {id: record._id, url: record.url}
    })
  })
};


BroadcastDataProvider.broadcast = function(id){
  var scope = this;

  return BroadcastDataProvider.find({_id: id}).then(function(record) {
    var streamId = record.streamId;
    return record;
  })
};


BroadcastDataProvider.find = function(params){
  var scope = this;

  return new Promise(function(resolve, reject) {
    // use cached values
    if (!_.isEmpty(scope.broadcasts_data)){
      resolve(scope.broadcasts_data);
    } else {
      broadcastDb.find(params, function(err, records){
        resolve(records);
      });
     }
  });
};

module.exports = BroadcastDataProvider;

