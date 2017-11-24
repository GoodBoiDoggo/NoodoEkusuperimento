angular.module('app',[]);

angular.module('app')
.controller('crudPageController', crudPageController);

crudPageController.$inject = ['$scope','$http'];

function crudPageController($scope,$http){
	var vm = this;
	vm.boi = "1";
	//vm.boi = "BOIII";
	
//	 vm.todos = [
//	      { username: 'BOI1', todo: 'Get rekt', isDone: true },
//	      { username: 'BOI2', todo: 'Cyka dat blyat', isDone: true },
//	      { username: 'BOI3', todo: 'Glorious Nippon Steel', isDone: true },
//	      { username: 'BOI4', todo: 'Jet fuel dont melt steel beams', isDone: true },
//	      { username: 'BOI5', todo: 'Git gud', isDone: false },
//	      { username: 'BOI6', todo: 'Slav', isDone: false },
//	    ];
	 
	 vm.testboi = testboi;
	 vm.addTodo = addTodo;
	 
	 testboi();
	 function testboi(){
		 $http.get('/api/all')
		 .then(function(response){
			 vm.todos = response.data;
		 })
	 }
	 
	 function addTodo(username,todo){
		 $http({
			    method: 'POST',
			    url: '/api/add',
			    data: {username:username,todo: todo},
			    headers: {'Content-Type': 'application/json'}
			});
		 testboi();
	 }
	 
	 
}

