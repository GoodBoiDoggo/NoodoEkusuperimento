angular.module('app.login')
.controller('loginController', login);

  login.$inject=['$scope', '$location', 'AuthService'];
  
  function login($scope, $location, AuthService) {
	  var vm = this;
    vm.login = function () {
    	
      // initial values
      vm.error = false;
      //vm.disabled = true;

      // call login from service
      AuthService.login(vm.loginForm.username, vm.loginForm.password)
        // handle success
        .then(function () {
          vm.path('/');
          vm.disabled = false;
          vm.loginForm = {};
        })
        // handle error
        ,function () {
          vm.error = true;
          vm.errorMessage = "Invalid username and/or password";
          vm.disabled = false;
          vm.loginForm = {};
        };

    };

}