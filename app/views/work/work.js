'use strict';

angular.module('myApp.work', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/work', {
    templateUrl: 'views/work/work.html',
    controller: 'workController'
  });
}])

.controller('workController', [function() {

}]);