angular.module('app.register')
.controller('registerController', register);

register.$inject = ['$location', 'authentication','$scope'];

function register($location, authentication,$scope) {
  var vm = this;
  vm.showError = false;
  vm.credentials = {
    name : "",
    email : "",
    password : ""
  };

  vm.onSubmit = function () {
    console.log('Submitting registration');
    authentication
      .register(vm.credentials)
      .then(function(res){
    	  console.log("whoag");
    	  if(res){
    		  vm.showError = true;
    	  }
    	  else{
    		  $scope.$emit('AUTHENTICATE');
    	        $location.path('/profile');
    	  }
    	
      },function(err){
    	  vm.showError = true;
      });
  };

}