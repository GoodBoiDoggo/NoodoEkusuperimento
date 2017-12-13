   console.log("Navbar directive detected!");
	angular.module('app.core')
        .directive('kariteunNavbar', function () {
            return {
                restrict: 'EA',
                templateUrl: 'core/navbar.html',
                controller: kariteunNavbar,
                controllerAs: 'vmNav',
                access:{restricted:false}
            };
        });

    kariteunNavbar.$inject = ['$anchorScroll', '$location', '$scope', '$timeout','authentication','User'];

    function kariteunNavbar($anchorScroll, $location, $scope, $timeout,authentication,User) {
    	 
        var vmNav = this;

        vmNav.updateUser = updateUser;
        vmNav.login = login;
        vmNav.logout = logout;
        updateUser();
//        function login(){
//        	User.setUser("NIPPON STEEL");
//  		  	//$scope.$emit('AUTHENTICATE',User.getUser());
//  		  	$scope.$broadcast('AUTHENTICATE',User.getUser());
//        }
        function updateUser(){
            vmNav.isLoggedIn = authentication.isLoggedIn();
            vmNav.currentUser = authentication.currentUser();
            User.setStatus(vmNav.isLoggedIn);
        }
        $scope.$on('AUTHENTICATE', function(event,args){
        	updateUser();
        });
        
        function logout(){

        	authentication.logout();

        	updateUser();
        }
        function login(){
        	
        }

    }