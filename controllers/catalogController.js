angular.module('app', []);

angular.module('app')
.controller('catalogController', catalogController);

catalogController.$inject = ['$http','$anchorScroll','$location'];

function catalogController($http,$anchorScroll,$location){
	var vm = this;
	vm.boi = "BOIII";
	vm.showItem = false;
	vm.hideReviews = true;
	vm.showHide = 'Show'
	vm.loaditems = loadItems;
	vm.viewItem = viewItem;
	vm.toggleReview = toggleReview;
	vm.backToCatalog = backToCatalog;
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
		 $anchorScroll();
	 }
	 
	 function toggleReview(){
		 if(vm.hideReviews){
			 vm.showHide = 'Hide';
			 vm.hideReviews = false;
			 $location.hash('revHash');
			 $anchorScroll();
			 
		 }
		 else{
			 vm.showHide = 'Show';
			 vm.hideReviews = true;
			 $location.hash('');
		 }
	 }
	 
	 function backToCatalog(){
		 vm.showHide = 'Show';
		 vm.hideReviews = true;
		 vm.showItem = false;
		 $location.hash('');
	 }
	 
}