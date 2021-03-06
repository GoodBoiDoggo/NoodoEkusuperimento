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

function run($rootScope, $location, authentication, FB) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        console.log($location);

        if ($location.path() === '/profile') {
            FB.setPath($location.$$path);
            if ($location.search().fbid) {
                console.log($location.search().fbid);
                //fbcode

                console.log('messenger auth process');
                FB.fbLoggedIn($location.search().fbid)
                    .then(function(res) {
                        console.log(res.data);
                        if (!res.data) {
                            FB.setPath($location.$$path);
                            console.log('Saved original path:');
                            console.log(FB.getPath());

                            $location.path('/login');

                        }
                    }, function(err) {
                        console.log('Fbid not registered.');
                        FB.setPath($location.$$path);
                        console.log('Saved original path:');
                        console.log(FB.getPath());
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
                        console.log(res.data);
                        if (res.data) {
                            console.log(res.data);
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
            FB.setPath($location.$$path);
            if ($location.search().fbid) {
                console.log($location.search().fbid);
                //fbcode

                console.log('messenger auth process');
                FB.fbLoggedIn($location.search().fbid)
                    .then(function(res) {
                        console.log(res.data);
                        if (res.data) {
                            console.log(res.data);
                            FB.setPath($location.$$path);
                            console.log('Saved original path:');
                            console.log(FB.getPath());
                            $location.path('/cart');

                        } else {
                            FB.setPath($location.$$path);
                            console.log('Saved original path:');
                            console.log(FB.getPath());
                            $location.path('/login')
                        }
                    }, function(err) {

                        console.log('Fbid not registered.');
                        FB.setPath($location.$$path);
                        console.log('Saved original path:');
                        console.log(FB.getPath());
                        $location.path('/register');
                    });
            } else if (authentication.isLoggedIn()) {
                $location.path('/cart');
            } else {
                $location.path('/login')
            }
        } else if ($location.path() === '/order') {
            FB.setPath($location.$$path);
            if ($location.search().fbid) {
                console.log($location.search().fbid);
                //fbcode

                console.log('messenger auth process');
                FB.fbLoggedIn($location.search().fbid)
                    .then(function(res) {
                        console.log(res);
                        if (res.data) {
                            console.log(res.data);
                            FB.setPath($location.$$path);
                            console.log('Saved original path:');
                            console.log(FB.getPath());
                            $location.path('/order');

                        } else {
                            FB.setPath($location.$$path);
                            console.log('Saved original path:');
                            console.log(FB.getPath());
                            $location.path('/login')
                        }
                    }, function(err) {
                        console.log('Fbid not registered.');
                        FB.setPath($location.$$path);
                        console.log('Saved original path:');
                        console.log(FB.getPath());
                        $location.path('/register');
                    });
            } else if (authentication.isLoggedIn()) {
                $location.path('/order');
            } else {
                $location.path('/login')
            }
        } else {
            FB.setPath($location.$$path);
        }


    });
}

appModule.run(['$rootScope', '$location', 'authentication', 'FB', run]);