console.log('USER SERVICE DETECTED!');
angular.module('app.core').factory('User',userService);
	userService.$inject=['$window'];
	function userService(win) {
	var vm = this;
	vm.loggedIn = false;
	    return {
	        // call to get all catalog items
	        isLoggedIn : isLoggedIn,
	        setStatus : setStatus
	    }       
	    
	    function setStatus(status){
	    	vm.loggedIn = status;
	    }
	    
	    function isLoggedIn() {//LOGIN
        	return vm.loggedIn;
        }

	}
