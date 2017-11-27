angular.module('app', []);

angular.module('app')
.controller('catalogController', catalogController);

catalogController.$inject = ['$http'];

function catalogController($http){
	var vm = this;
	vm.boi = "BOIII";
	loadItems();
	
	
	 function loadItems(){
		 $http.get('/catalog/all')
		 .then(function(response){
			 vm.catalogItems = response.data;
		 })
	 }
}