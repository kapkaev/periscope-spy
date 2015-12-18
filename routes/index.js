var express = require('express');
var router = express.Router();
var _ = require('underscore-node');

var DataProvider = require('../libs/data_providers/main')
var Presentor = require('../libs/events_presentor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = DataProvider.broadcasts({join: { $gt: 0 }});

  data.then(function(records){
    data = _.sortBy(records, function(r){
      return -r.join
    })
    res.render('broadcast/index', { data: data });
  })

});


module.exports = router;
