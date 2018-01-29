console.log("APP MODULE REACHED!");
//	angular.module('app',[
//		'ngRoute',
//		'appRoutes',
//		'angularController',
//		'catalogController',
//		'itemController',
//		'catalogService',
//		'userService'
//		]);
//      DoggoDoggoFastDoggoMuchProgramSuchWoWMeMeBigBoy

var appModule =
    angular
    .module('app', [
        /* Shared Modules */
        'app.core',
        /* Feature Modules */
        //      'app.welcome',
        'app.catalog',
        'app.item',
        'app.register',
        'app.login',
        'app.profile',
        'app.cart',
        'app.order',
        'app.checkout'
    ]);
appModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

function run($rootScope, $location, authentication, FB, $window, sAuth) {
    //APP ID 328158877659945

    //js.src = "https://connect.facebook.net/en_US/sdk.js";


    $rootScope.user = {};

    $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded

        FB.init({

            /*
             The app id of the web app;
             To register a new app visit Facebook App Dashboard
             ( https://developers.facebook.com/apps/ )
            */

            appId: '328158877659945',

            /*
             Adding a Channel File improves the performance
             of the javascript SDK, by addressing issues
             with cross-domain communication in certain browsers.
            */

            channelUrl: 'app/channel.html',

            /*
             Set if you want to check the authentication status
             at the start up of the app
            */

            status: true,

            /*
             Enable cookies to allow the server to access
             the session
            */

            cookie: true,

            /* Parse XFBML */

            xfbml: true
        });

        sAuth.watchAuthenticationStatusChange();

    };

    (function(d) {
        // load the Facebook javascript SDK

        var js,
            id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";

        ref.parentNode.insertBefore(js, ref);

    }(document));
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if ($location.path() === '/profile') {
            if ($location.search().fbid) {
                console.log($location.search().fbid);
                //fbcode

                console.log('messenger auth process');
                FB.fbLoggedIn($location.search().fbid)
                    .then(function(res) {
                        console.log(res.data[0]);
                        if (!res.data[0].loginsession) {
                            console.log(res.data[0].loginsession);
                            $location.path('/login');

                        }
                    }, function(err) {
                        console.log('Fbid not registered.');
                        $location.path('/register');
                    });

            } else if (!authentication.isLoggedIn()) {
                $location.path('/login');
            }
        } else if ($location.path() === '/register' || $location.path() === '/login') {
            if ($location.search().fbid) {
                console.log($location.search().fbid);
                //fbcode

                console.log('messenger auth process');
                FB.fbLoggedIn($location.search().fbid)
                    .then(function(res) {
                        console.log(res.data[0]);
                        if (res.data[0].loginsession) {
                            console.log(res.data[0].loginsession);
                            $location.path('/profile');

                        } else {
                            $location.path('/login')
                        }
                    }, function(err) {
                        console.log('Fbid not registered.');
                        $location.path('/register');
                    });
            } else if (authentication.isLoggedIn()) {
                $location.path('/profile');
            }
        } else if ($location.path() === '/cart') {
            if ($location.search().fbid) {
                console.log($location.search().fbid);
                //fbcode

                console.log('messenger auth process');
                FB.fbLoggedIn($location.search().fbid)
                    .then(function(res) {
                        console.log(res.data[0]);
                        if (res.data[0].loginsession) {
                            console.log(res.data[0].loginsession);
                            $location.path('/cart');

                        } else {
                            $location.path('/login')
                        }
                    }, function(err) {
                        console.log('Fbid not registered.');
                        $location.path('/register');
                    });
            } else if (authentication.isLoggedIn()) {
                $location.path('/cart');
            } else {
                $location.path('/login')
            }
        }

    });
}

appModule.run(['$rootScope', '$location', 'authentication', 'FB', '$window', 'sAuth', run]);