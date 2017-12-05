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
	vm.sizeClass = sizeClass;
	vm.sizeClick = sizeClick;
	vm.avStyle = avStyle;
	vm.clickedSize;
//	vm.filter = filter;
	loadItems();
	
	vm.customFilter = function (obj) {
        vm.re = new RegExp(vm.searchParam, 'i');
        return !vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype) || vm.re.test(obj.prodcolor) || vm.re.test(obj.prodbrand)|| vm.re.test(obj.gender);
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
		 vm.clickedSize = angular.copy(vm.itemData.prodsizes[0]);
		 vm.searchParam = "";
		 $anchorScroll();
	 }
	 
	 function toggleReview(){
		 if(vm.hideReviews){
			 vm.showHide = 'Hide';
			 vm.hideReviews = false;
//			 $location.hash('revHash');
//			 $anchorScroll();
			 
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
	 
	 function sizeClass(data){
		 if(data == vm.clickedSize){
			 return 'clkSize';
		 }
		 else{
			 return 'defSize';
		 }
	 }
	 
	 function sizeClick(data){
		 vm.clickedSize = data;
	 }
//	 function filter(){
//		 vm.filteredCatalogItems = angular.copy(vm.catalogItems);
//		 vm.filteredCatalogItems = angular.copy($filter('filter')(vm.filteredCatalogItems,{prodname:vm.searchParam}));
	 
//	 }
	 
}