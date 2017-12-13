  angular
    .module('app.profile')
    .controller('profileController', profile);

  profile.$inject = ['$location', 'meanData'];
  function profile($location, meanData) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .then(function(res) {
        vm.user = res.data;
      },function (e) {
        console.log(e);
      });
  }
