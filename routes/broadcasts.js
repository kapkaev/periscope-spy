var express = require('express');
var router = express.Router();
var _ = require('underscore-node');

var DataProvider = require('../libs/data_providers/main')
var Presentor = require('../libs/events_presentor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = DataProvider.broadcasts({});

  data.then(function(records){
    res.render('broadcast/index', { data: records });
  })

});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var data = DataProvider.events({_id: id}).then(function(records){
    var presentor = new Presentor(records);
    return presentor.comments();
  });

  data.then(function(records){
    res.render('broadcast/show', { data: records });
  })

});
module.exports = router;
