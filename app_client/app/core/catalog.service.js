console.log('CATALOG SERVICE DETECTED!');
angular.module('app.core').factory('Catalog', catalogService);

function catalogService($http) {
    return {
        // call to get all catalog items
        //http://184.172.241.167:30250
        get: function() {
            console.log('Retrieving catalog...');
            return $http.get('/catalog/all');
            //return $http.get('http://184.172.241.167:30250/catalog/all'); //working
        },

        getItem: function(prodcode) {
            console.log("Fetch item: " + prodcode);
            return $http.get('/item/' + prodcode);
            //return $http.get('http://184.172.241.167:30250/item/' + prodcode); //working
        },

        addReview: function(review) {
            console.log('Adding review...')
            return $http.post('/api/review', review);
            //return $http.post('http://184.172.241.167:30250/item/' + review.prodcode + '/review', review.review);
        },

        delReview: function(prodcode, id) {
            console.log('Deleting review...');
            return $http.delete('/api/review/' + prodcode + '/' + id);
            //return $http.delete('http://184.172.241.167:30250/item/' + prodcode + '/review/' + id);
        },
        editReview: function(prodcode, review) {
            console.log('Editing review...');
            return $http.put('/api/review/' + prodcode, review);
            //return $http.put('http://184.172.241.167:30250/item/' + prodcode + '/review', review);
        },
        updateItem: function(item) {
            console.log('Updating item details...');
            return $http.put('/item/' + item.prodcode, item);
            //return $http.put('http://184.172.241.167:30250/item/' + item.prodcode, item);
        },
        updateRating: function(prodcode, rating) {
            console.log('Submitting rating...');
            return $http.post('/item/rate/' + prodcode, rating);
        },
        getItems: function(items) {
            console.log('Fetching cart item details...');
            return $http.get('/items/' + items);
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
                itemSizeData.id = angular.copy(inventory[i]._id.$oid);
                itemSizeData.size = angular.copy(parseFloat(inventory[i].prodCode.substring(6).replace('-', '.')));
                itemSizeData.stock = angular.copy(parseFloat(inventory[i].qtyAvailable));
                itemSizes.push(itemSizeData);
                itemSizeData = {};
            }
            return itemSizes;
        }
    }

}