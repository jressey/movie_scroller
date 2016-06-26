angular.module('movieScrollerApp', [
	'ngRoute',
  'angularGrid',
	'movieScrollerApp.services'
	])
	.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MovieController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
