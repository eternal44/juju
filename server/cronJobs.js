var CronJob = require('cron').CronJob;
var request = require('request');

module.exports = {
  itemHistory : function (){
    new CronJob('00-60 * * * * *' , function () {
      var allItems = request.get('http://localhost:3000/api/items', function(err, res, body) {
        console.log(JSON.parse(body)[0]);
      });


      
    },

    // function to run when job stops
    function (){
      console.log('job stopped.  Could be a cron jrob crash');
    }, true, 'America/Los_Angeles');
  },

  test : function () {
    var seconds = 0;
    new CronJob('00-60 * * * * *', function () {
      seconds++;
      console.log('It\'s been '+ seconds + ' seconds');
    },
    function(){
      console.log('job stopped');
    }, true, 'America/Los_Angeles');
  }
}

