var Datastore = require('nedb'),
    broadcastDbFile = process.cwd() + '/db/broadcast_copy.db',
    broadcastDb = new Datastore({ filename: broadcastDbFile, autoload: true });

function BroadcastDataProvider(){

}

BroadcastDataProvider.broadcasts = function(params){
  var scope = this;
  return BroadcastDataProvider.find(params).then(function(records) {
    return records;
  })
};

BroadcastDataProvider.find = function(params){
  var scope = this;

  return new Promise(function(resolve, reject) {
    broadcastDb.find(params, function(err, records){
      resolve(records);
    });
  });
};

module.exports = BroadcastDataProvider;

