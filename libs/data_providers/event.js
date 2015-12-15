var Datastore = require('nedb'),
    EventDbFile = process.cwd() + '/db/event.db',
    eventDb = new Datastore({ filename: EventDbFile, autoload: true });

function EventDataProvider(){

}

EventDataProvider.events = function(params){
  return EventDataProvider.find(params).then(function(records) {
    return records;
  })
};

// TODO: move to abstract base class
EventDataProvider.find = function(params){
  return new Promise(function(resolve, reject) {
    eventDb.find(params, function(err, records){
      resolve(records);
    });
  });
};

module.exports = EventDataProvider;

