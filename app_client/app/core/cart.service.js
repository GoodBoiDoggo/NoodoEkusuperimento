angular
    .module('app.core')
    .service('cart', cartService);

cartService.$inject = ['$http'];

function cartService($http) {

    return {
        get: getCart,
        create: createCart
    }

    function getCart() {
        return $http.get('http://184.172.241.167:32759/cart');

    }

    function createCart(cart) {
        return $http.post('http://184.172.241.167:32759/cart', cart);
    }
}