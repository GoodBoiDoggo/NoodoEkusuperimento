console.log("Webview directive detected!");
angular.module('app.core')
    .directive('webviewButtons', function() {
        return {
            restrict: 'EA',
            templateUrl: 'core/WVButtons.html',
            controller: webviewButtons,
            controllerAs: 'vmWv',
            access: { restricted: false }
        };
    });

webviewButtons.$inject = ['$anchorScroll', '$location', '$scope', '$timeout', 'FB'];

function webviewButtons($anchorScroll, $location, $scope, $timeout, FB) {

    var vmWv = this;

    vmWv.updateUser = updateUser;
    vmWv.login = login;
    vmWv.logout = logout;
    //updateUser();
    //        function login(){
    //        	User.setUser("NIPPON STEEL");
    //  		  	//$scope.$emit('AUTHENTICATE',User.getUser());
    //  		  	$scope.$broadcast('AUTHENTICATE',User.getUser());
    //        }
    function updateUser() {
        if (!$location.search().fbid) {

            // vmNav.isLoggedIn = authentication.isLoggedIn();
            // vmNav.currentUser = authentication.currentUser();
        } else {
            FB.login();
        }

    }
    $scope.$on('AUTHENTICATE', function(event, args) {
        updateUser();
    });

    function logout() {

        authentication.logout();

        updateUser();
    }

    function login() {

    }

}