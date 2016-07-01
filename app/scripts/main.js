angular.module('movieScrollerApp')
.controller('MovieController', function($scope, $q, movieService) {
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
        var base_url = "http://image.tmdb.org/t/p/w342";
        return base_url + "/" + moviePosterPath;
    }

    $scope.init();
});