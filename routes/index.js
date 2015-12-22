var express = require('express');
var router = express.Router();
var _ = require('underscore-node');

var DataProvider = require('../libs/data_providers/main')
var Presentor = require('../libs/events_presentor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = DataProvider.broadcasts({join: { $gt: 10 }});

  data.then(function(records){
    var data = _.groupBy(records, function(rec){
      var date = new Date(rec.created_at);
      var timeStr = date.getMonth() +"/"+ date.getDay() +"/"+ date.getFullYear() +" "+ date.getHours()+":00";
      return timeStr;
    })
    return data;
  }).then(function(data){
    var data = _.map(data, function(records, time){
      var recs = _.sortBy(records, function(r){
        return -r.join
      })
      return {time: time, data: recs}
    })

    res.render('broadcast/index', { data: data });
  })

});


module.exports = router;
