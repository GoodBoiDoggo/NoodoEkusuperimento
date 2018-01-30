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

   kariteunNavbar.$inject = ['$anchorScroll', '$location', '$scope', '$timeout', 'authentication', 'profile'];

   function kariteunNavbar($anchorScroll, $location, $scope, $timeout, authentication, profile) {

       var vmNav = this;
       vmNav.currentUser = {};
       vmNav.updateUser = updateUser;
       vmNav.login = login;
       vmNav.logout = logout;
       vmNav.redirect = redirect;
       updateUser();
       //        function login(){
       //        	User.setUser("NIPPON STEEL");
       //  		  	//$scope.$emit('AUTHENTICATE',User.loadUser());
       //  		  	$scope.$broadcast('AUTHENTICATE',User.loadUser());
       //        }
       function redirect(screen) {
           $location.path(screen);
       }

       function updateUser() {
           if (!$location.search().fbid) {

               vmNav.isLoggedIn = authentication.isLoggedIn();
               if (vmNav.isLoggedIn) {
                   if (profile.isLoaded()) {
                       vmNav.currentUser = profile.getUser();
                       vmNav.currentUser.status = true;
                   } else {

                       profile.loadUser()
                           .then(function(res) {
                               vmNav.currentUser = res.data;
                               profile.setUser(vmNav.currentUser);
                               vmNav.currentUser.status = true;

                           }, function(e) {
                               console.log(e);
                               vmNav.currentUser.status = false;
                               //lead to a page saying fetching user data failed
                           });
                   }

               }



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