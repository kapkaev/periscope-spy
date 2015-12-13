var Spy = require('node-periscope-spy');

function SpyBootstrapper(config, userId){
  this.userId = userId;
  this.config = config;
}

SpyBootstrapper.prototype.start = function() {
  var spy = new Spy(this.config);

  spy.follow(this.userId);
};

module.exports = SpyBootstrapper;
