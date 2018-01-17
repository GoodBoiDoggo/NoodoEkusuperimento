angular
    .module('app.core')
    .service('cart', cartService);

cartService.$inject = ['$http'];

function cartService($http) {

    return {
        get: getCart,
        create: createCart,
        add: addToCart
    }

    function getCart(customerId) {
        return $http.get('http://184.172.241.167:31995/cart/search/cuid/' + customerId);

    }

    function createCart(cart) {
        return $http.post('http://184.172.241.167:31995/cart', cart);
    }

    function addToCart(customerId, item) {
        return $http.post('http://184.172.241.167:31995/cart/' + customerId + '/add', item);
    }

}