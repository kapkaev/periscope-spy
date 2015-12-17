var express = require('express');
var router = express.Router();
var _ = require('underscore-node');

var DataProvider = require('../libs/data_providers/main')
var Presentor = require('../libs/events_presentor')

router.get('/:id/:type?', function(req, res, next) {
  var id = req.params.id;
  var types = [1,2];

  if (req.params.type){
    if (req.params.type.match(/comment/)){
      types = [1]
    }

    if (req.params.type.match(/heart/)){
      types = [2]
    }
  }

  var data = DataProvider.events({_id: id}, {type: { $in: types }}).then(function(records){
    var presentor = new Presentor(records);
    return presentor;
  });

  data.then(function(presentor){
    var events = presentor.events();
    var counts = _.countBy(events, function(rec){
      var type = undefined;
      if (rec.type == 1) {
        type = 'comment'
      } else if (rec.type == 2) {
        type = 'heart'
      }
      return type
    })
    res.render('broadcast/show', { events: events, counts: counts, broadcastId: id });
  })

});
module.exports = router;
