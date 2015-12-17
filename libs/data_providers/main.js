var BroadcastDataProvider = require('./broadcast');
var EventDataProvider = require('./event');
var Promise = require("bluebird");
var _ = Promise.promisifyAll(require('underscore-node'));

function MainDataProvider(){

}

MainDataProvider.broadcasts = function(params){
  return BroadcastDataProvider.broadcasts(params)
};

MainDataProvider.events = function(broadcastParams, eventParams){
  return BroadcastDataProvider.broadcasts(broadcastParams).then(function(records){
    return records[0].streamId;
  }).then(function(streamId){
    var params = _.extend({}, {streamId: streamId}, eventParams)
    return EventDataProvider.events(params)
  });
}

module.exports = MainDataProvider;

