'use strict';

var myApp = angular.module('myApp.contact', ['ngRoute']);

myApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/contact', {
			templateUrl: 'views/contact/contact.html',
			controller: 'contactController'
		});
	}
]);

myApp.controller('contactController', [
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