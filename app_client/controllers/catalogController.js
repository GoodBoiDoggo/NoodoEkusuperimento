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
	vm.clickedSize;
	vm.showAdv = false;
	vm.enaDis = 'Enable';
	vm.gOptions = ['Any','Male','Female'];
    vm.selectedG = vm.gOptions[0];
	//Functions
	vm.loaditems = loadItems;
	vm.viewItem = viewItem;
	vm.toggleReview = toggleReview;
	vm.backToCatalog = backToCatalog;
	vm.sizeClass = sizeClass;
	vm.sizeClick = sizeClick;
	vm.avStyle = avStyle;
	vm.showAdvSearch = showAdvSearch;
	vm.createFilter = createFilter;

//	vm.filter = filter;
	loadItems();
	createFilter();
	
	function createFilter(){
		
		if(!vm.showAdv){
			vm.customFilter = function (obj) {
		        vm.re = new RegExp(vm.searchParam, 'i');
		        return !vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype) || vm.re.test(obj.prodcolor) || vm.re.test(obj.prodbrand)|| vm.re.test(obj.gender);
		    };
		}
		else{
//			if(vm.brandFilter){
//				vm.customFilter = function (obj) {
//			        vm.re = new RegExp(vm.searchParam, 'i');
//			        vm.bf = new RegExp(vm.brandFilter, 'i');
//			        vm.initTest = (!vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype) || vm.re.test(obj.prodcolor)|| vm.re.test(obj.gender)) ;
//			        return (!vm.brandFilter || vm.bf.test(obj.prodbrand)) && vm.initTest ;
//			    };
//			}
			vm.customFilter = function (obj) {
				vm.re = new RegExp(vm.searchParam, 'i');
		        vm.finalTest = (!vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype) || vm.re.test(obj.prodcolor)|| vm.re.test(obj.gender)) ;
		        if(vm.brandFilter){
			        vm.bf = new RegExp(vm.brandFilter, 'i');
		        	vm.finalTest = (!vm.brandFilter || vm.bf.test(obj.prodbrand)) && vm.finalTest ;
		        }
		        if(vm.typeFilter){
			        vm.tf = new RegExp(vm.typeFilter, 'i');
		        	vm.finalTest = (!vm.typeFilter || vm.tf.test(obj.prodtype)) && vm.finalTest ;
		        }
		        if(vm.colorFilter){
			        vm.cf = new RegExp(vm.colorFilter, 'i');
		        	vm.finalTest = (!vm.colorFilter || vm.cf.test(obj.prodcolor)) && vm.finalTest ;
		        }
		        if(vm.selectedG != 'Any'){

		        	if(vm.selectedG == 'Female'){
			        	vm.finalTest = obj.gender=='female' && vm.finalTest ;
		        	}
		        	else{
		        		vm.finalTest = obj.gender=='male' && vm.finalTest ;
		        	}

		        }
		        
		        return vm.finalTest;
		    };
		}
	}
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
	 
	 function showAdvSearch(){
		
		 if(!vm.showAdv){
			 vm.showAdv = true;
			 vm.enaDis = 'Disable';
			 createFilter();
		 }
		 else{
			 
			 vm.showAdv = false;
			 vm.enaDis = 'Enable';
			 createFilter();
		 }
		 
	 }
//	 function filter(){
//		 vm.filteredCatalogItems = angular.copy(vm.catalogItems);
//		 vm.filteredCatalogItems = angular.copy($filter('filter')(vm.filteredCatalogItems,{prodname:vm.searchParam}));
	 
//	 }
	 
}