angular
    .module('app.core')
    .service('cart', cartService);

cartService.$inject = ['$http'];

function cartService($http) {
    var baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aededed07eef2a58ce7aa924bcaf8c04f47e57bf75360845b3145d6f902b01d0/cabde24e-0259-49ea-9d10-e39789ed4cb8';
    //var baseUrl = 'http://184.172.241.167:31016';
    return {
        get: getCart,
        create: createCart,
        add: addToCart,
        update: updateQuantity,
        delete: deleteCartItem
    }

    function getCart(customerId) {
        return $http.get(baseUrl + '/cart/' + customerId);

    }

    function createCart(cart) {
        return $http.post(baseUrl + '/cart', cart);
    }

    function addToCart(customerId, item) {

        return $http.post(baseUrl + '/cart/' + customerId + '/add', item);
    }

    function updateQuantity(customerId, item) {

        return $http.put(baseUrl + '/cart/' + customerId + '/update', item);
    }

    function deleteCartItem(customerId, item) {

        return $http.delete(baseUrl + '/cart/' + customerId + '/delete/' + item.prodCode);
    }

}