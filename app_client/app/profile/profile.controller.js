  angular
      .module('app.profile')
      .controller('profileController', profile);

  profile.$inject = ['$location', 'meanData', 'FB', '$anchorScroll', '$scope', '$animate'];

  function profile($location, meanData, FB, $anchorScroll, $scope, $animate) {
      var vm = this;
      vm.fbid = $location.search().fbid;
      vm.user = {};
      vm.loaded = false;
      vm.showForm = false;
      vm.showFloats = false;
      vm.message = '';
      vm.pageInit = pageInit;
      vm.addDDA = addDDA;
      vm.formSubmit = formSubmit;

      $anchorScroll();
      pageInit();
      //   $scope.$on('PROFILE', function(event, data) {
      //       console.log('profile returned');
      //       vm.user = angular.copy(data);
      //       vm.message = '';
      //   });

      function formSubmit() {
          console.log('DDA submitted');
          vm.message = 'Setting DDA...'
          meanData.updateDDA(vm.user)
              .then(function(res) {
                  vm.message = res.data;
                  vm.showForm = false;
                  console.log(vm.message);
              }, function(err) {
                  vm.message = "DDA not set. (Server error)";
                  console.log(vm.message);
              });

      }

      function addDDA() {
          if (vm.showForm) {
              vm.showForm = false;
          } else {
              vm.showForm = true;

          }
      }

      function pageInit() {
          $animate.enabled(true);
          vm.message = 'Loading details...'
          if (vm.fbid) {
              //fbcode
              FB.getFbProfile(vm.fbid)
                  .then(function(res) {
                      vm.user = res.data[0];
                      vm.message = '';
                      vm.loaded = true;

                  }, function(e) {
                      console.log(e.data);
                      vm.message = 'Loading failed. Please try again.';
                  });
          } else {
              $scope.$emit('AUTHENTICATE', 'profile');

              //pc code
              meanData.getProfile()
                  .then(function(res) {
                      vm.user = res.data;
                      console.log(res.data);
                      vm.message = '';
                      vm.loaded = true;
                  }, function(e) {
                      console.log(e);
                      vm.message = 'Loading failed.'
                  });
          }
      }

  }