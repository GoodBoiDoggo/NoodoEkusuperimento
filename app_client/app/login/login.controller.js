angular.module('app.login')
.controller('loginController', login);

  login.$inject=['$location', 'authentication','$scope'];
  
  function login($location, authentication, $scope) {
	    var vm = this;
	    vm.showError = false;
	    vm.credentials = {
	      email : "",
	      password : ""
	    };

	    vm.onSubmit = function () {
	      authentication
	        .login(vm.credentials)
	        .then(function(){
	        	$scope.$emit('AUTHENTICATE');
	          $location.path('/profile');
	          
	        },function(err){
	          vm.showError = true;
	        });
	    };

	  }
  

