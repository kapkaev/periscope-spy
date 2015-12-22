var express = require('express');
var router = express.Router();
var _ = require('underscore-node');

var DataProvider = require('../libs/data_providers/main')
var Presentor = require('../libs/events_presentor')

router.get('/:id/:type?', function(req, res, next) {
  var id = req.params.id;
  var types = [1,2,3];

  if (req.params.type){
    if (req.params.type.match(/comment/)){
      types = [1]
    }

    if (req.params.type.match(/heart/)){
      types = [2]
    }

    if (req.params.type.match(/join/)){
      types = [3]
    }

  }

  res.locals = {
    eventType: req.app.locals.eventType
  }

  var data = DataProvider.events({_id: id}, {type: { $in: types }}).then(function(obj){
    var presentor = new Presentor(obj.broadcast, obj.records);
    return presentor;
  });

  data.then(function(presentor){
    var events = presentor.events();
    var counts = presentor.broadcastCounts();
    res.render('broadcast/show', { events: events, counts: counts, broadcast: presentor.broadcast });
  })

});
module.exports = router;
