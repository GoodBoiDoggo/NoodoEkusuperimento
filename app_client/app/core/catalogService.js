console.log('CATALOG SERVICE DETECTED!');
angular.module('app.core').factory('Catalog', catalogService);

function catalogService($http) {
    return {
        // call to get all catalog items
        get: function() {
            console.log('Retrieving catalog...');
            return $http.get('/catalog/all');
        },

        getItem: function(prodcode) {
            console.log("Fetch item: " + prodcode);
            return $http.get('/item/' + prodcode);
        },

        addReview: function(review) {
            console.log('Adding review...')
            return $http.post('/api/addreview', review);
        }
    }

}