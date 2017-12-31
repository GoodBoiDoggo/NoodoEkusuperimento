  angular
      .module('app.core')
      .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];

  function meanData($http, authentication) {

      var getProfile = function() {
          return $http.get('/api/profile', {
              headers: {
                  Authorization: 'Bearer ' + authentication.getToken()
              }
          });
      };

      var updateDDA = function(user) {
          return $http.post('/api/updateDDA', user);
      }



      return {
          getProfile: getProfile,
          updateDDA: updateDDA
      };
  }