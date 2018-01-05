  angular
      .module('app.profile')
      .controller('profileController', profile);

  profile.$inject = ['$location', 'meanData', 'FB', '$anchorScroll', '$scope', '$animate', '$http'];

  function profile($location, meanData, FB, $anchorScroll, $scope, $animate, $http) {
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
      vm.resend = resend;
      vm.checkActive = checkActive;
      vm.clickMode = clickMode;
      $anchorScroll();
      pageInit();

      function clickMode() {
          if (vm.showForm) {
              return 'unclickableDDADiv';
          } else {
              return 'clickableDDADiv';
          }
      }

      function resend() {
          $http.post('/api/resend', vm.user)
              .then(function(res) {
                  vm.mailmessage = res.data;
                  vm.showWarning = false;
              }, function(err) {
                  vm.mailmessage = err.data;
                  vm.showWarning = false;
              });
      }

      function checkActive() {
          if (vm.active) {
              return 'MeMeBigBoy';
          } else {
              return 'MeMeBigGirl';
          }
      }

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
          if (!vm.showForm) {
              vm.showForm = true;
          }
      }

      function pageInit() {
          $animate.enabled(true);
          vm.message = 'Loading details...'
          vm.active = false;
          vm.showWarning = true;
          if (vm.fbid) {
              //fbcode
              FB.getFbProfile(vm.fbid)
                  .then(function(res) {
                      vm.user = res.data[0];
                      vm.message = '';
                      vm.loaded = true;
                      if (vm.user.active) {
                          vm.active = true;
                      }


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
                      if (vm.user.active) {
                          vm.active = true;
                      }
                  }, function(e) {
                      console.log(e);
                      vm.message = 'Loading failed.'
                  });
          }
      }

  }