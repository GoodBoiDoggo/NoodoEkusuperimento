   console.log("Navbar directive detected!");
   angular.module('app.core')
       .directive('kariteunNavbar', function() {
           return {
               restrict: 'EA',
               templateUrl: 'core/navbar.html',
               controller: kariteunNavbar,
               controllerAs: 'vmNav'
           };
       });

   kariteunNavbar.$inject = ['$anchorScroll', '$location', '$scope', '$timeout', 'authentication'];

   function kariteunNavbar($anchorScroll, $location, $scope, $timeout, authentication) {

       var vmNav = this;
       vmNav.currentUser = {};
       vmNav.updateUser = updateUser;
       vmNav.login = login;
       vmNav.logout = logout;
       updateUser();
       //        function login(){
       //        	User.setUser("NIPPON STEEL");
       //  		  	//$scope.$emit('AUTHENTICATE',User.getUser());
       //  		  	$scope.$broadcast('AUTHENTICATE',User.getUser());
       //        }
       function updateUser() {
           if (!$location.search().fbid) {
               console.log("boi");
               vmNav.isLoggedIn = authentication.isLoggedIn();
               if (vmNav.isLoggedIn) {
                   authentication.currentUser()
                       .then(function(res) {
                           vmNav.currentUser = res.data;
                           vmNav.currentUser.status = true;
                       }, function(e) {
                           console.log(e);
                           vmNav.currentUser.status = false;
                           //lead to a page saying fetching user data failed
                       });
               }
               console.log(vmNav.currentUser);
               console.log(vmNav.isLoggedIn);


           }
       }
       $scope.$on('AUTHENTICATE', function(event, args) {
           if (args === 'login') {
               updateUser();
           }

       });

       function logout() {

           authentication.logout();

           updateUser();
       }

       function login() {

       }

   }