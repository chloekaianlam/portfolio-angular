'use strict';

// Using factory to create getContentData function, which can be passed around in views
myApp.factory('getContentData', function($http, $q) {
	return {
		retrieveData: function() {
			var deferred = $q.defer(),
				promise = deferred.promise;

			$http.get('portfolio.json').success(function(data) {
				deferred.resolve(data);
			});

			return promise;
		}
	}
});