console.log("Webview directive detected!");
angular.module('app.core')
    .directive('webviewButtons', function() {
        return {
            restrict: 'EA',
            templateUrl: 'core/WVButtons.html',
            controller: webviewButtons,
            controllerAs: 'vmWv'
        };
    });

webviewButtons.$inject = ['$anchorScroll', '$location', '$scope', '$timeout', 'FB'];

function webviewButtons($anchorScroll, $location, $scope, $timeout, FB) {

    var vmWv = this;

    vmWv.fbid = $location.search().fbid;
    vmWv.fbParam = '?fbid=' + vmWv.fbid;
    vmWv.email = $location.search().email;
    vmWv.updateUser = updateUser;
    vmWv.loggedIn = false;
    vmWv.exists = false;
    vmWv.login = login;
    vmWv.logout = logout;
    vmWv.click = click;
    vmWv.userStatus;
    vmWv.loaded = false;
    vmWv.redirect = redirect;
    updateUser();



    function click() {
        $anchorScroll();
    }

    function redirect(screen) {
        $location.path(screen);
    }

    function updateUser() {
        if (vmWv.fbid) {
            if (FB.isLoaded()) {
                console.log('CHECKPPOINT:');
                console.log(FB.getFbProfile());
                if (FB.getFbProfile().loginsession) {

                    console.log('Logged In');
                    vmWv.loggedIn = true;
                    vmWv.exists = true;

                } else {
                    console.log('Logged Out');
                    vmWv.loggedIn = false;
                    vmWv.exists = true;
                }
                vmWv.loaded = true;
            } else {
                FB.loadFbProfile(vmWv.fbid)
                    .then(function(res) {
                        FB.setFbProfile(res.data);
                        console.log('BOI: ' + res.data.loginsession)
                        if (res.data.loginsession != "") {

                            console.log('Logged In');
                            vmWv.loggedIn = true;
                            vmWv.exists = true;

                        } else {
                            console.log('Logged Out');
                            vmWv.loggedIn = false;
                            vmWv.exists = true;
                        }
                        vmWv.loaded = true;

                    }, function(err) {
                        console.log('User not registered');
                        vmWv.loggedIn = false;
                        vmWv.exists = false;
                        vmWv.loaded = true;
                    });
            }

        }
    }

    $scope.$on('FBAUTH', function(event, args) {
        console.log('Event caught: ' + args);
        FB.loadFbProfile(vmWv.fbid)
            .then(function(res) {
                FB.setFbProfile(res.data);
                updateUser();
            }, function(err) {
                console.log('Load user failed. Server error encountered.');
            });

    });

    function logout() {

        authentication.logout();

        updateUser();
    }

    function login() {

    }

}