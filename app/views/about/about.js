'use strict';

var myApp = angular.module('myApp.about', ['ngRoute']);

myApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/about', {
			templateUrl: 'views/about/about.html',
			controller: 'aboutController'
		});
	}
]);

myApp.controller('aboutController', [
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