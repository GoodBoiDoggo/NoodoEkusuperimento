angular.module('app',[]);

angular.module('app')
.controller('angularController', angularController);

angularController.$inject = ['$scope'];

function angularController($scope) {
    var vm = this;
    vm.sum = 2;
    vm.clicked = false;
    // Implementation
    vm.todos = [
	      { name: 'Master HTML/CSS/Javascript', completed: true },
	      { name: 'Learn AngularJS', completed: false },
	      { name: 'Build NodeJS backend', completed: false },
	      { name: 'Get started with ExpressJS', completed: false },
	      { name: 'Setup MongoDB database', completed: false },
	      { name: 'Be awesome!', completed: false },
	    ];
	  vm.boi = "BOI";
	  vm.gal = "GAL";
    
	  vm.longlib = longlib;
	  vm.triggered = triggered;
	 
	  
	  function longlib(data1, data2){
		  vm.sum = (Number(data1)+Number(data2) || 0);
		  console.log("BOI");
	  }
	  
	  function triggered(){
		  if(vm.clicked){
			  vm.clicked = false;
		  }
		  else{
			  vm.clicked = true;
		  }
	  }
	 
}

