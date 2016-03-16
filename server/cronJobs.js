var CronJob = require('cron').CronJob;
var request = require('request');

module.exports = {
  itemHistory : function (){
    var allItems;
    new CronJob('00-60 * * * * *' , function () {
      request.get('http://localhost:3000/api/items', function(err, res, body) {
        // console.log(JSON.parse(body));
        allItems = Array.prototype.slice.call(JSON.parse(body));
      });
      // add promise

      // console.log('look', typeof allItems);
      // allItems = Array.prototype.slice.call(allItems);
      console.log(allItems);


      // for(var i = 0; i < allItems.length; i++){
      //   console.log('x', x);
      //   console.log('y', y);
      //   console.log('z', z);
      // };
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

