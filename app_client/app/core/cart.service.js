angular
    .module('app.core')
    .service('cart', cartService);

cartService.$inject = ['$http'];

function cartService($http) {

    return {
        get: getCart
    }

    function getCart() {
        return $http.get('http://184.172.241.167:32360/cart');
    }
}