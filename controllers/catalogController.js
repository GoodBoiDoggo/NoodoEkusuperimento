angular.module('app', []);

angular.module('app')
.controller('catalogController', catalogController);

catalogController.$inject = ['$http','$anchorScroll','$location','$filter'];

function catalogController($http,$anchorScroll,$location,$filter){
	var vm = this;
	vm.loggedIn = false;
	vm.boi = "BOIII";
	vm.showItem = false;
	vm.hideReviews = true;
	vm.showHide = 'Show'
	vm.loaditems = loadItems;
	vm.viewItem = viewItem;
	vm.toggleReview = toggleReview;
	vm.backToCatalog = backToCatalog;
	vm.avStyle = avStyle;
//	vm.filter = filter;
	loadItems();
	
	vm.customFilter = function (obj) {
        vm.re = new RegExp(vm.searchParam, 'i');
        return !vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype);
    };
    
	 function loadItems(){
		 $http.get('/catalog/all')
		 .then(function(response){
			 vm.catalogItems = response.data;
			 
		 })
	 }
	 
	 function viewItem(data){
		 vm.showItem = true;
		 vm.itemData = data;
		 vm.searchParam = "";
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
	 
	 function avStyle(){
		 if(vm.loggedIn && !vm.itemData.isavailable){
			 return {opacity : 0.5};
		 }
	 }
//	 function filter(){
//		 vm.filteredCatalogItems = angular.copy(vm.catalogItems);
//		 vm.filteredCatalogItems = angular.copy($filter('filter')(vm.filteredCatalogItems,{prodname:vm.searchParam}));
	 
//	 }
	 
}