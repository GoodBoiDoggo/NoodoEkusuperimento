   console.log("Navbar directive detected!");
	angular.module('app.core')
        .directive('kariteunNavbar', function () {
            return {
                restrict: 'EA',
                templateUrl: 'core/navbar.html',
                controller: kariteunNavbar,
                controllerAs: 'vmNav'
            };
        });

    kariteunNavbar.$inject = ['$anchorScroll', '$location', '$scope', '$timeout','User'];

    function kariteunNavbar($anchorScroll, $location, $scope, $timeout,User) {
    	 
        var vmNav = this;
        vmNav.login = login;
        vmNav.logout = logout;
//        function scrollTo(id) {
//            if ($location.path() !== '/') {
//                $location.path('/');
//            }
//            $timeout(function () {
//                $location.hash(id);
//                $anchorScroll.yOffset = 50;
//                $anchorScroll();
//            });
//        }
//
        $scope.$on('AUTHENTICATE', function (event, data) {
            console.log('AUTHENTICATE:' + data);
        	if (data) {
        		console.log("Logged in");
                vmNav.authenticated = true;
                vmNav.currentUser = data;
                
            } else {
            	console.log("Logged out");
                vmNav.authenticated = false;
                vmNav.currentUser = data;
            }
        });

        function login(){
        	User.setUser("NIPPON STEEL");
  		  	//$scope.$emit('AUTHENTICATE',User.getUser());
  		  	$scope.$broadcast('AUTHENTICATE',User.getUser());
        }
        
        function logout(){
        	User.logout();
        	$scope.$broadcast('AUTHENTICATE',User.getUser());
        }

    }