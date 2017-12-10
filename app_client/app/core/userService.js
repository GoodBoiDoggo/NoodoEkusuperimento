console.log('USER SERVICE DETECTED!');
angular.module('app.core').factory('User',userService);
	userService.$inject=['$window'];
	function userService(win) {
	var vm = this;
	vm.userName="";
	    return {
	        // call to get all catalog items
	        setUser : function(uName) {//LOGIN
	        	console.log('setUser('+ uName +')');
	        		vm.userName = uName;
	        },
	        
	         getUser:function(){
	        	console.log("getUser()");
	        	return vm.userName;
	        },
	        
	        logout: function(){//LOGOUT
	        	vm.userName = "";
		        console.log('Log out('+ vm.userName +')');
	        }
	    }       

	}
