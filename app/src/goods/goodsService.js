(function () {
	'use strict';
	
    angular
        .module('app')
        .factory('GoodsService', GoodsService);
		
	GoodsService.$inject = ['$rootScope', '$http', '$q'];
	
    function GoodsService($rootScope, $http, $q) {
		var webUrl = $rootScope.myConfig.webUrl;
		
        return {
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            findGood: findGood
        };

        function addItem(item) {
            var url = webUrl + 'api/goods/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/goods/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/goods/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }

        function findGood(id) {
            var url = webUrl + 'api/goods/find';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                })
                .catch(function (reject) {
                    return $q.reject(reject);
                });
        }
	}
})();