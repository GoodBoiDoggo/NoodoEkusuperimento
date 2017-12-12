console.log('AUTH SERVICE DETECTED!');
angular.module('app.core').factory('AuthService', authService);

authService.$inject=['$q', '$timeout', '$http']
  
  function authService($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      $http.get('/user/status')
      // handle success
      .then(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      ,function (data) {
        user = false;
      };
      
      return $http.get('/user/status')
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .then(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        ,function (data) {
          user = false;
          deferred.reject();
        };

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .then(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        ,function (data) {
          user = false;
          deferred.reject();
        };

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password})
        // handle success
        .then(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        ,function (data) {
          deferred.reject();
        };

      // return promise object
      return deferred.promise;

    }

}