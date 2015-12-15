var BroadcastDataProvider = require('./broadcast');
var EventDataProvider = require('./event');

function MainDataProvider(){

}

MainDataProvider.broadcasts = function(params){
  return BroadcastDataProvider.broadcasts(params)
};

MainDataProvider.events = function(params){
  return BroadcastDataProvider.broadcasts(params).then(function(records){
    return records[0].streamId;
  }).then(function(streamId){
    return EventDataProvider.events({streamId: streamId})
  });
}

module.exports = MainDataProvider;

