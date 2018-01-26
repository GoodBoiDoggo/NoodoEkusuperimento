console.log('CATALOG SERVICE DETECTED!');
angular.module('app.core').factory('Catalog', catalogService);

function catalogService($http) {
    var baseUrl2 = '';
    //var baseUrl = 'http://184.172.241.167:31177';
    var baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/aededed07eef2a58ce7aa924bcaf8c04f47e57bf75360845b3145d6f902b01d0/7896c17f-95fd-4031-9e92-0d5c70f4feae';
    return {

        get: function() {
            console.log('Retrieving catalog...');
            return $http.get(baseUrl2 + '/catalog/all');
            // return $http.get(baseUrl + '/catalog/all'); //working
        },

        getItem: function(prodcode) {
            console.log("Fetch item: " + prodcode);
            return $http.get(baseUrl2 + '/item/' + prodcode);
            // return $http.get(baseUrl + '/item/' + prodcode); //defect
        },

        addReview: function(review) {
            console.log('Adding review...');
            console.log(review.review);
            // return $http.post(baseUrl2 + '/api/review', review);
            return $http.post(baseUrl + '/item/' + review.prodcode + '/review', review.review); //working
        },

        delReview: function(prodcode, id) {
            console.log('Deleting review...');
            // return $http.delete(baseUrl2 + '/api/review/' + prodcode + '/' + id);
            return $http.delete(baseUrl + '/item/' + prodcode + '/review/' + id); //working
        },
        editReview: function(prodcode, review) {
            console.log('Editing review...');
            console.log(review);
            // return $http.put(baseUrl2 + '/api/review/' + prodcode, review);
            return $http.put(baseUrl + '/item/' + prodcode + '/review', review); //working
        },
        updateItem: function(item) {
            console.log('Updating item details...');
            //return $http.put(baseUrl2 + '/item/' + item.prodcode, item); //obsolete
            return $http.put(baseUrl + '/item/' + item.prodcode, item); //working
        },
        updateRating: function(prodcode, rating) {
            console.log('Submitting rating...');
            return $http.post(baseUrl2 + '/item/rate/' + prodcode, rating);
        },
        getItems: function(items) {
            console.log('Fetching cart item details...');
            return $http.get(baseUrl2 + '/items/' + items);
            // return $http.get(baseUrl + '/items/' + items);
        },
        checkAvailability: function(catalog, inventory) {
            for (i = 0; i < catalog.length; i++) {
                catalog[i].isavailable = false;
                for (ii = 0; ii < inventory.length; ii++) {
                    if (catalog[i].prodcode === inventory[ii].prodCode.substring(0, 6)) {
                        catalog[i].isavailable = true;
                    }
                }
            }
            return catalog;
        },
        getSizes: function(inventory) {
            var itemSizeData = {};
            var itemSizes = [];

            for (i = 0; i < inventory.length; i++) {
                itemSizeData.size = angular.copy(parseFloat(inventory[i].prodCode.substring(6).replace('-', '.')));
                itemSizeData.stock = angular.copy(parseFloat(inventory[i].qtyAvailable));
                itemSizes.push(itemSizeData);
                itemSizeData = {};
            }
            return itemSizes;
        }
    }

}