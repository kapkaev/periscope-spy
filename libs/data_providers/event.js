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
    global.eventDB.find(params, function(err, records){
      resolve(records);
    });
  });
};

module.exports = EventDataProvider;

