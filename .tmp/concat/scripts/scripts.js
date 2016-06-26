angular.module('movieScrollerApp', [
	'ngRoute',
  'angularGrid',
	'movieScrollerApp.services'
	])
	.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MovieController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

angular.module('movieScrollerApp')
.controller('MovieController', ["$scope", "$q", "movieService", function($scope, $q, movieService) {
    $scope.movies = []; 
    $scope.page = 1;

    $scope.init = function() {
        $scope.getMovies();
    }

    $scope.getMovies = function() {
         movieService.getMovies($scope.page)
         .then(function(data) {
            var movies = data['results'];
            return movies;
        }).then(function(movies) {
            for(var i = 0; i < movies.length; i++) {
                movies[i].poster_url = $scope.getPosterUrl(movies[i].poster_path)
            }
            if ($scope.movies.length > 0) {
                $scope.movies = $scope.movies.concat(movies);
            } else {
                $scope.movies = movies;
            }
            $scope.page += 1;
        }, function() {
            $scope.movieError = true;
        });
     }

     $scope.getPosterUrl = function(moviePosterPath) {
        var base_url = "http://image.tmdb.org/t/p/w185";
        return base_url + "/" + moviePosterPath;
    }

    $scope.init();
}]);
angular.module('movieScrollerApp.services', []).factory('movieService', ["$q", "$http", function($q, $http) {

	return {
        getMovies: function(page = 1) {
        	var deferred = $q.defer();
        	var popularity_url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
            var api_key = "213afbf4ecf881046c45c2ba921582d4";
            var url = popularity_url + "&page=" + page + "&api_key=" + api_key
        	var promise = $.ajax({
            type: "GET",
            url: url,
        	}).done(function(data) {
                deferred.resolve(data);
            }).fail(function(err) {
            	console.log(err);
            	deferred.reject(err);
            });
            return deferred.promise;
        }
    }
}]);
angular.module('twitterApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<br> <div class=\"container\"> <h1>Most popular movies</h1> </div> <br> <div class=\"dynamic-grid\" angular-grid=\"movies\" ag-grid-width=\"185\" ag-gutter-size=\"0\" ag-id=\"gallery\" ag-refresh-on-img-load=\"false\" ag-infinite-scroll=\"getMovies()\" ng-infinite-scroll-distance=\"3\"> <div data-ng-repeat=\"m in movies\" class=\"grid\"> <span class=\"title\">{{m.title}}</span> <img ng-src=\"{{m.poster_url}}\" class=\"grid-img\" data-actual-width=\"185px\" data-actual-height=\"278px\"> </div> </div> <div ng-show=\"movieError\"> Sorry, something went wrong </div> "
  );

}]);
