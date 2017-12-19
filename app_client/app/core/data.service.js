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

      var getFbProfile = function(fbid) {
          return $http.get('/api/fbprofile/' + fbid);
      };

      return {
          getProfile: getProfile,
          getFbProfile: getFbProfile
      };
  }