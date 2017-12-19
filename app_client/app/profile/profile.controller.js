  angular
      .module('app.profile')
      .controller('profileController', profile);

  profile.$inject = ['$location', 'meanData'];

  function profile($location, meanData) {
      var vm = this;
      vm.fbid = $location.search().fbid;
      vm.user = {};
      vm.pageInit = pageInit;
      pageInit();

      function pageInit() {
          if (vm.fbid) {
              //fbcode
              meanData.getFbProfile(vm.fbid)
                  .then(function(res) {
                      vm.user = res.data;
                  }, function(e) {
                      console.log(e);
                  });
          } else {
              //pc code
              meanData.getProfile()
                  .then(function(res) {
                      vm.user = res.data;
                  }, function(e) {
                      console.log(e);
                  });
          }
      }

  }