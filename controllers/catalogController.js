angular.module('app', []);

angular.module('app')
.controller('catalogController', catalogController);

catalogController.$inject = ['$http','$window'];

function catalogController($http,$window){
	var vm = this;
	vm.boi = "BOIII";
	vm.showItem = false;
	vm.loaditems = loadItems;
	vm.viewItem = viewItem;
	loadItems();
	
	
	 function loadItems(){
		 $http.get('/catalog/all')
		 .then(function(response){
			 vm.catalogItems = response.data;
		 })
	 }
	 
	 function viewItem(data){
		 vm.showItem = true;
		 vm.itemData = data;
		 $window.scrollTo(0, 0);
	 }
	 
}