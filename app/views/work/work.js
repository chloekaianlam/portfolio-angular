'use strict';

var myApp = angular.module('myApp.work', ['ngRoute']);

myApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/work', {
			templateUrl: 'views/work/work.html',
			controller: 'workController'
		});
	}
]);

myApp.controller('workController', [
	'$scope',
	'getContentData',
	// getContentData is a global function passed as a parameter 
	function($scope, getContentData) {
		
		// Passing retrieveData function from services
		getContentData.retrieveData().then(function(data) {
			$scope.contentData = data;
		});
	}
]);