  angular
      .module('app.core')
      .service('profile', profileService);

  profileService.$inject = ['$http', 'authentication'];

  function profileService($http, authentication) {
      var vm = this;
      vm.user = {};
      vm.loaded = false;
      var baseUrl = 'https://kariteun-shopping.mybluemix.net';
      var getUser = function() {
          return vm.user;
      };
      var isLoaded = function() {
          return vm.loaded;
      }
      var setUser = function(user) {
          vm.loaded = true;
          vm.user = user;

      }

      var loadUser = function() {
          return $http.get(baseUrl + '/api/profile', {
              headers: {
                  Authorization: 'Bearer ' + authentication.getToken()
              }
          });
      }

      var updateDDA = function(user) {
          return $http.put(baseUrl + '/api/updateDDA', user);
      }

      var sendActivation = function(user) {
          return $http.post(baseUrl + '/api/resend', user);
      }

      var logout = function() {
          vm.user = {};
          vm.loaded = false;
      }
      return {
          getUser: getUser,
          updateDDA: updateDDA,
          sendActivation: sendActivation,
          isLoaded: isLoaded,
          loadUser: loadUser,
          setUser: setUser,
          logout: logout
      };
  }