

angular.module('itemController',[])
.controller('itemController', itemController);

itemController.$inject = ['$http','Catalog','$routeParams'];

function itemController($http,Catalog,$routeParams){
	var vm = this;
	vm.loggedIn = false;
	vm.boi = "BOIII";
	vm.hideReviews = true;
	vm.showHide = 'Show'
	vm.clickedSize;
	vm.showAdv = false;
	vm.enaDis = 'Enable';
	vm.gOptions = ['Any','Male','Female'];
	//Functions
	vm.loaditem = loadItem;
	vm.toggleReview = toggleReview;
	vm.sizeClass = sizeClass;
	vm.sizeClick = sizeClick;

//	vm.filter = filter;
	loadItem();

	
	
	 function loadItem(){
		 Catalog.getItem($routeParams.id).then(function(res){
			 vm.itemData = angular.copy(res.data[0]);
			 vm.clickedSize = angular.copy(vm.itemData.prodsizes[0]);
		 })
		 
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
	 
	 
}