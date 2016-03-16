var CronJob = require('cron').CronJob;
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

module.exports = {
  itemHistory : function (){
    var allItems;
    new CronJob('00-60 * * * * *' , function () {
      request.getAsync('http://localhost:3000/api/items')
      .then(function(v){
        // console.log(v.body);
        var items = JSON.parse(v.body);

        for(var i = 0; i < items.length; i++){
          console.log('z', items[i].id);
        };
      });
      // // check getAsync's callbacks or use callbacks to handle the async results
      // .then(function(err, res, body) {
      //   // console.log(JSON.parse(body));
      //   allItems = JSON.parse(body);
      //   // console.log(allItems);
      //   return allItems;
      // })
      // .then(function(items){
      //   console.log('hill', items);
      //   // return items;
      // });

      // add promise

      // console.log('look', typeof allItems);
      // allItems = Array.prototype.slice.call(allItems);


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

