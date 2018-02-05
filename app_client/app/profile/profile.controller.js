  angular
      .module('app.profile')
      .controller('profileController', profile);

  profile.$inject = ['$location', 'profile', 'FB', '$anchorScroll', '$scope', '$animate'];

  function profile($location, profile, FB, $anchorScroll, $scope, $animate) {
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
      vm.gotoOrder = gotoOrder;

      $anchorScroll();
      pageInit();

      function gotoOrder() {
          $location.path('/order');
      }

      function clickMode() {
          if (vm.showForm) {
              return 'unclickableDDADiv';
          } else {
              return 'clickableDDADiv';
          }
      }

      function resend() {
          profile.sendActivation(vm.user)
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
          profile.updateDDA(vm.user)
              .then(function(res) {
                  vm.message = res.data;
                  profile.setUser(vm.user);

                  vm.showForm = false;
                  console.log(vm.message);
              }, function(err) {
                  vm.message = "DDA not set. (Server error)";

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
              if (FB.isLoaded()) {

                  vm.user = FB.getFbProfile();
                  vm.message = '';
                  vm.loaded = true;
                  if (FB.getFbProfile().active) {
                      vm.active = true;
                  }
              } else {
                  FB.loadFbProfile(vm.fbid)
                      .then(function(res) {
                          vm.user = res.data;
                          FB.setFbProfile(vm.user);
                          vm.message = '';
                          vm.loaded = true;
                          if (vm.user.active) {
                              vm.active = true;
                          }


                      }, function(e) {
                          console.log(e.data);
                          vm.message = 'Loading failed. Please try again.';
                      });
              }

          } else {
              $scope.$emit('AUTHENTICATE', 'profile');

              //pc code
              if (profile.isLoaded()) {
                  vm.user = profile.getUser();
                  console.log('PROFILE(get):')
                  console.log(vm.user);
                  vm.message = '';
                  vm.loaded = true;
                  if (vm.user.active) {
                      vm.active = true;
                  }
              } else {
                  profile.loadUser()
                      .then(function(res) {
                          vm.user = res.data;
                          profile.setUser(vm.user);
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

  }