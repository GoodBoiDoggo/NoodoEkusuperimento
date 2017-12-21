console.log('CATALOG SERVICE DETECTED!');
angular.module('app.core').factory('Catalog', catalogService);

function catalogService($http) {
    return {
        // call to get all catalog items
        get: function() {
            console.log($http.get('/catalog/all'))
            return $http.get('/catalog/all');
        },

        getItem: function(prodcode) {
            console.log("Fetch item: " + prodcode);
            return $http.get('/item/' + prodcode);
        }

        // these will work when more API routes are defined on the Node side of things
        // call to POST 
        //        create : function(nerdData) {
        //            return $http.post('/api/nerds', nerdData);
        //        },
        //
        //        // call to DELETE
        //        delete : function(id) {
        //            return $http.delete('/api/nerds/' + id);
        //        }
    }

}