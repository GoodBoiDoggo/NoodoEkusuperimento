  angular
      .module('app.core')
      .service('profile', profileService);

  profileService.$inject = ['$http', 'authentication'];

  function profileService($http, authentication) {
      var baseUrl = 'https://kariteun-shopping.mybluemix.net'
      var getUser = function() {
          return $http.get(baseUrl + '/api/profile', {
              headers: {
                  Authorization: 'Bearer ' + authentication.getToken()
              }
          });
      };

      var updateDDA = function(user) {
          return $http.put(baseUrl + '/api/updateDDA', user);
      }

      var sendActivation = function(user) {
          return $http.post(baseUrl + '/api/resend', user);
      }

      return {
          getUser: getUser,
          updateDDA: updateDDA,
          sendActivation: sendActivation
      };
  }