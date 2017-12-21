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

    vmWv.fbid = $location.search().fbid;
    vmWv.fbParam = '?fbid=' + vmWv.fbid;
    vmWv.updateUser = updateUser;
    vmWv.loggedIn = false;
    vmWv.exists = false;
    vmWv.login = login;
    vmWv.logout = logout;
    vmWv.userStatus;
    vmWv.loaded = false;
    updateUser();
    //        function login(){
    //        	User.setUser("NIPPON STEEL");
    //  		  	//$scope.$emit('AUTHENTICATE',User.getUser());
    //  		  	$scope.$broadcast('AUTHENTICATE',User.getUser());
    //        }
    function updateUser() {
        if (vmWv.fbid) {
            FB.login(vmWv.fbid)
                .then(function(res) {
                    console.log(res);
                    vmWv.exists = res.exists;
                    vmWv.loggedIn = res.loggedIn;
                    vmWv.loaded = true;
                }, function(err) {
                    vmWv.loaded = true;
                });

        }

    }
    $scope.$on('FBAUTHENTICATE', function(event, args) {
        updateUser();
    });

    function logout() {

        authentication.logout();

        updateUser();
    }

    function login() {

    }

}