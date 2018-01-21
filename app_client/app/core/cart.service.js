angular
    .module('app.core')
    .service('cart', cartService);

cartService.$inject = ['$http'];

function cartService($http) {

    return {
        get: getCart,
        create: createCart,
        add: addToCart,
        update: updateQuantity,
        delete: deleteCartItem
    }

    function getCart(customerId) {
        return $http.get('http://184.172.241.167:32639/cart/' + customerId);

    }

    function createCart(cart) {
        return $http.post('http://184.172.241.167:32639/cart', cart);
    }

    function addToCart(customerId, item) {

        return $http.post('http://184.172.241.167:32639/cart/' + customerId + '/add', item);
    }

    function updateQuantity(customerId, item) {

        return $http.put('http://184.172.241.167:32639/cart/' + customerId + '/update', item);
    }

    function deleteCartItem(customerId, item) {

        return $http.delete('http://184.172.241.167:32639/cart/' + customerId + '/delete/' + item.prodCode);
    }

}