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
              if (!payload.exp > Date.now() / 1000) {
                  logout();
              }
              return payload.exp > Date.now() / 1000;
          } else {
              return false;
          }
      };



      var currentUser = function() {
          if (isLoggedIn()) {
              //   var token = getToken();
              //   var payload = token.split('.')[1];
              //   payload = $window.atob(payload);
              //   payload = JSON.parse(payload);

              return $http.get('/api/profile', {
                  headers: {
                      Authorization: 'Bearer ' + getToken()
                  }
              });
          }
      };

      register = function(user) {

          return $http.post('/register', user).then(function(res) {
              if (res.data.token === undefined) {
                  console.log('Token undefined');
                  return res.data.msg;
              } else {
                  saveToken(res.data.token);
                  console.log('Token saved');
                  return res.data;

              }
          }, function(err) {
              return err.data.msg;
          });
      };



      login = function(user) {
          console.log('Login service reached.')
          return $http.post('/login', user).then(function(res) {
              console.log('Login request done.')
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
          register: register,
          login: login,
          logout: logout
      };
  }