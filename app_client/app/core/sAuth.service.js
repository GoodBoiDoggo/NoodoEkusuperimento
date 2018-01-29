angular
    .module('app.core')
    .service('sAuth', authService);

authService.$inject = ['$http'];

function authService($http) {
    var baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aededed07eef2a58ce7aa924bcaf8c04f47e57bf75360845b3145d6f902b01d0/e21a0bb1-5f8a-4886-ac81-fa58ed400f2f';
    //var baseUrl = 'http://184.172.241.167:32692';
    return {
        watchAuthenticationStatusChange: watchLoginChange,
        getUserInfo: getUserInfo,
        logout: logout
    }

    var watchLoginChange = function() {

        var _self = this;

        FB.Event.subscribe('auth.authResponseChange', function(res) {

            if (res.status === 'connected') {

                /*
                 The user is already logged,
                 is possible retrieve his personal info
                */
                _self.getUserInfo();

                /*
                 This is also the point where you should create a
                 session for the current user.
                 For this purpose you can use the data inside the
                 res.authResponse object.
                */

            } else {

                /*
                 The user is not logged to the app, or into Facebook:
                 destroy the session on the server.
                */

            }

        });

    }

    var getUserInfo = function() {

        var _self = this;

        FB.api('/me', function(res) {
            $rootScope.$apply(function() {
                $rootScope.user = _self.user = res;
            });
        });

    }
    var logout = function() {

        var _self = this;

        FB.logout(function(response) {
            $rootScope.$apply(function() {
                $rootScope.user = _self.user = {};
            });
        });

    }
}