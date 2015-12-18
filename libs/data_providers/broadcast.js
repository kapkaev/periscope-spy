function BroadcastDataProvider(){
}

BroadcastDataProvider.broadcasts = function(params){
  return BroadcastDataProvider.find(params).then(function(records) {
    return records;
  })
};

BroadcastDataProvider.find = function(params){
  return new Promise(function(resolve, reject) {
    global.broadcastDB.find(params, function(err, records){
      resolve(records);
    });
  });
};

module.exports = BroadcastDataProvider;

