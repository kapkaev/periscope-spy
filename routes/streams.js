var express = require('express');
var router = express.Router();
var _ = require('underscore-node');

var Presentor = require('../libs/data_presentor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = Presentor.streams();

  data.then(function(records){
    res.send(records);
  })

});

module.exports = router;
