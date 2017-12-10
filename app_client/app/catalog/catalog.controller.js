

angular.module('app.catalog')
.controller('catalogController', catalogController);

catalogController.$inject = ['$http','$anchorScroll','$location','$filter','Catalog','User'];

function catalogController($http,$anchorScroll,$location,$filter,Catalog,User){
	var vm = this;
	vm.loggedIn = false;
	vm.hideReviews = true;
	vm.showAdv = false;
	vm.enaDis = 'Enable';
	vm.gOptions = ['Any','Male','Female'];
    vm.selectedG = vm.gOptions[0];
    vm.loaded = false;
	vm.itemFound = true;
	//Functions
	vm.loaditems = loadItems;
	vm.showAdvSearch = showAdvSearch;
	vm.createFilter = createFilter;
	vm.getty = getty;
//	vm.filter = filter;
	loadItems();
	createFilter();
	$anchorScroll();
	function getty(){
		console.log(User.getUser());
	}
	function createFilter(){
		
		if(!vm.showAdv){
			vm.customFilter = function (obj) {
		        vm.re = new RegExp(vm.searchParam, 'i');
		        return !vm.searchParam || vm.re.test(obj.prodname) || vm.re.test(obj.tags) || vm.re.test(obj.prodtype) || vm.re.test(obj.prodcolor) || vm.re.test(obj.prodbrand)|| vm.re.test(obj.gender);
		    };
		}
		else{
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
		 Catalog.get().then(function(res){
			 vm.catalogItems = angular.copy(res.data);
			 console.log(vm.catalogItems);
			 if(vm.catalogItems){
				 vm.itemFound = true;
				 vm.loaded = true;
			 }
			 else{
				 vm.itemFound = false;
			 }
		 })
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
	 
}