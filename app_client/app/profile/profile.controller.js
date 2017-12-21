  angular
      .module('app.profile')
      .controller('profileController', profile);

  profile.$inject = ['$location', 'meanData', 'FB'];

  function profile($location, meanData, FB) {
      var vm = this;
      vm.fbid = $location.search().fbid;
      vm.user = {};
      vm.pageInit = pageInit;
      pageInit();

      function pageInit() {
          vm.user.name = 'Loading...';
          vm.user.email = 'Loading...';
          if (vm.fbid) {
              //fbcode
              FB.getFbProfile(vm.fbid)
                  .then(function(res) {
                      vm.user = res.data[0];

                  }, function(e) {
                      console.log(e);
                      vm.user.name = 'Cannot load';
                      vm.user.email = 'Cannot load';
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