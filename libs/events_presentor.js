var Promise = require("bluebird"),
    _ = Promise.promisifyAll(require('underscore-node'));


function EventsPresentor(broadcast, data){
  this.data = data;
  this.broadcast = broadcast;
}

//1: "COMMENT",
//2: "HEART",
//3: "JOIN"

EventsPresentor.prototype.count_by_type = function() {
  return _.countBy(this.data, function(rec) {
    return rec.type;
  });
};

EventsPresentor.prototype.comments_count = function() {
  return count_by_type[1]
};


EventsPresentor.prototype.hearts_count = function() {
  return count_by_type[2]
};

EventsPresentor.prototype.joins_count = function() {
  return count_by_type[3]
};

EventsPresentor.prototype.events = function() {
  var data = _.filter(this.data, function(rec){
    return [1,2,3].indexOf(rec.type) != -1
  })

  return _.sortBy(data, 'timestamp');
};


EventsPresentor.prototype.comments = function() {
  data = this.events()
  return _.filter(data, function(rec){
    return rec.type == 1;
  })
}

EventsPresentor.prototype.hearts = function() {
  data = this.events()
  return _.filter(data, function(rec){
    return rec.type == 2;
  })
}

EventsPresentor.prototype.broadcastCounts = function() {
  return _.pick(this.broadcast, 'comment', 'join', 'heart')
}

module.exports = EventsPresentor;
