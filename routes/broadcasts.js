var express = require('express');
var router = express.Router();
var _ = require('underscore-node');

var Presentor = require('../libs/data_presentor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = Presentor.broadcasts();

  data.then(function(records){
    res.render('broadcast/index', { data: records });
  })

});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var data = Presentor.broadcast(id);

  data.then(function(record){
    res.render('broadcast/show', { data: record[0] });
  })

});
module.exports = router;
