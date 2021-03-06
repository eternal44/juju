angular.module('authFactory', [])

.factory('Auth', function ($window, $http, $state){
  var loggedIn;
  var authFuncs={};
  var data;


  authFuncs.isloggedIn = function () {
    //make the the firebase data to an object to get fb data
    loggedIn = JSON.parse($window.localStorage.getItem('firebase:session::jtimes3'));
    if(!!loggedIn){
      //sends to database to get userId
      data = {
        FBuID : loggedIn.facebook.id,
        userName : loggedIn.facebook.displayName
      };

      return $http({
        method: 'POST',
        url: 'api/users',
        data: data
        })
      .then(function successCallback(response) {
        authFuncs.userId= response.data.id;
        return response.data.id;
      }, function errorCallback(response) {
        alert('Sorry we can\'t get login, Please try again');
        $state.go('login');
      })
    }
    return !!loggedIn;
  };

  authFuncs.logOut = function () {
    $window.localStorage.removeItem('firebase:host:jtimes3.firebaseio.com');
    $window.localStorage.removeItem('firebase:session::jtimes3');
    loggedIn=$window.localStorage.getItem('firebase:session::jtimes3');
    $state.go('landing');
    return $window.localStorage.removeItem('firebase:session::jtimes3');  
  };


  authFuncs.addUserToDB =function (authData){
    data = {
      FBuID : authData.facebook.id,
      FBname : authData.facebook.displayName
    };
    //edge case, what if someone changes their display name?
    return $http({
      method: 'POST',
      url: 'api/users',
      data: data
    }).then(function successCallback(response) {
      authFuncs.userId= response.data.id;
      return $http({
        method: 'GET',
        url : '/api/users/' + authFuncs.userId
      }).then(function successCallback(req, res) {
        var userData =req.data[0];
        if (userData.contactpref === 'noContact'){
          $state.go('additems');
        } else if(userData.contactpref === 'email' && userData.email === null){
          $state.go('usersettings');
          alert('We need your email address to notify you when your items reach their target prices!');
        } else if (userData.contactpref === 'text' && userData.text === null){
          $state.go('usersettings');
          alert('We need your phone number to notify you when your items reach their target prices!');

        } else if (userData.email === null && userData.text === null) {
           $state.go('usersettings');
          alert('We need your phone number or email to notify you when your items reach their target prices!');
        } else {
          $state.go('additems');
        }
      })
    }, function errorCallback (response){
      alert('Sorry we are unable to get your information! \n Please try again');
    })
  };

  return authFuncs
});
