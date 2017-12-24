  angular
      .module('app.profile')
      .controller('profileController', profile);

  profile.$inject = ['$location', 'meanData', 'FB', '$anchorScroll'];

  function profile($location, meanData, FB, $anchorScroll) {
      var vm = this;
      vm.fbid = $location.search().fbid;
      vm.user = {};
      vm.pageInit = pageInit;
      vm.message = '';
      $anchorScroll();
      pageInit();

      function pageInit() {
          vm.message = 'Loading details...'
          if (vm.fbid) {
              //fbcode
              FB.getFbProfile(vm.fbid)
                  .then(function(res) {
                      vm.user = res.data[0];
                      vm.message = '';

                  }, function(e) {
                      console.log(e.data);
                      vm.message = 'Loading failed. Please try again.';
                  });
          } else {
              //pc code
              meanData.getProfile()
                  .then(function(res) {
                      vm.user = res.data;
                      vm.message = ''
                  }, function(e) {
                      console.log(e);
                      vm.message = 'Loading failed.'
                  });
          }
      }

  }