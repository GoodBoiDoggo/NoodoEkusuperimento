  angular
      .module('app.core')
      .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];

  function authentication($http, $window) {

      var saveToken = function(token) {
          $window.localStorage['mean-token'] = token;
      };

      var getToken = function() {
          return $window.localStorage['mean-token'];
      };

      var isLoggedIn = function() {
          var token = getToken();
          var payload;

          if (token) {
              payload = token.split('.')[1];
              payload = $window.atob(payload);
              payload = JSON.parse(payload);

              return payload.exp > Date.now() / 1000;
          } else {
              return false;
          }
      };

      var fbLoggedIn = function(fbid) {

          //   return $http({
          //       url: '/fbloggedin/' + fbid,
          //       method: "GET"

          //   });
          return $http.get('/fbloggedin/' + fbid);
          //   .then(function(res) {
          //     console.log('account found');
          //     console.log(res.data);
          //     return res;
          // }, function(err) {
          //     return false;
          // });

      }

      var currentUser = function() {
          if (isLoggedIn()) {
              var token = getToken();
              var payload = token.split('.')[1];
              payload = $window.atob(payload);
              payload = JSON.parse(payload);
              return {
                  email: payload.email,
                  name: payload.name
              };
          }
      };

      register = function(user) {

          return $http.post('/register', user).then(function(res) {
              if (res.data.token === undefined) {
                  return res.data.errorMsg;
              } else {
                  saveToken(res.data.token);
              }
          });
      };

      registerfb = function(user) {

          return $http.post('/registerfb', user).then(function(res) {
              if (res.data.token === undefined) {
                  return res.data.errorMsg;
              } else {
                  saveToken(res.data.token);
              }
          });
      };

      login = function(user) {
          return $http.post('/login', user).then(function(res) {
              saveToken(res.data.token);
          });
      };

      logout = function() {
          $window.localStorage.removeItem('mean-token');
      };

      return {
          currentUser: currentUser,
          saveToken: saveToken,
          getToken: getToken,
          isLoggedIn: isLoggedIn,
          fbLoggedIn: fbLoggedIn,
          register: register,
          registerfb: registerfb,
          login: login,
          logout: logout
      };
  }