  angular
      .module('app.core')
      .service('profile', profileService);

  profileService.$inject = ['$http', 'authentication'];

  function profileService($http, authentication) {

      var getUser = function() {
          return $http.get('/api/profile', {
              headers: {
                  Authorization: 'Bearer ' + authentication.getToken()
              }
          });
      };

      var updateDDA = function(user) {
          return $http.put('/api/updateDDA', user);
      }

      var sendActivation = function(user) {
          return $http.post('/api/resend', user);

      }

      return {
          getUser: getUser,
          updateDDA: updateDDA,
          sendActivation: sendActivation
      };
  }