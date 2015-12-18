var Spy = require('node-periscope-spy');

function SpyBootstrapper(config, userId){
  this.userId = userId;
  this.config = config;
  this.spy = new Spy(this.config);
  this.eventDB = this.spy.eventDB;
  this.broadcastDB = this.spy.broadcastDB;
}

SpyBootstrapper.prototype.start = function() {
  this.spy.follow(this.userId);
};

module.exports = SpyBootstrapper;
