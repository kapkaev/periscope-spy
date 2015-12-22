var Promise = require("bluebird"),
    _ = Promise.promisifyAll(require('underscore-node'));


function EventsPresentor(broadcast, data){
  this.data = data;
  this.broadcast = broadcast;
}

//1: "COMMENT",
//2: "HEART",
//3: "JOIN"

EventsPresentor.prototype.events = function() {
  var data = _.filter(this.data, function(rec){
    return [1,2,3].indexOf(rec.type) != -1
  })

  return _.sortBy(data, 'timestamp');
};

EventsPresentor.prototype.broadcastCounts = function() {
  return _.pick(this.broadcast, 'comment', 'join', 'heart')
}

module.exports = EventsPresentor;
