angular.module('movieScrollerApp')
.controller('MovieController', function($scope, $q, movieService) {
    $scope.movies = []; 
    $scope.page;

    $scope.init = function() {
        $scope.getMovies(1);
    }

    $scope.getMovies = function(page) {
         movieService.getMovies(page)
         .then(function(data) {
            var movies = data['results'];

            // if ($scope.movies.size > 0) {
            //     $scope.movies = $scope.movies.concat(movies);
            // } else {
            //     $scope.movies = movies;
            // }
            return movies;
        }).then(function(movies) {
            console.log(movies);
            for(var i = 0; i < movies.length; i++) {
                console.log(movies[i].poster_path);
                movies[i].poster_url = $scope.getPosterUrl(movies[i].poster_path)
            }
            $scope.movies = movies;
        }, function() {
            $scope.movieError = true;
        });
     }

     $scope.getPosterUrl = function(moviePosterPath) {
        var base_url = "http://image.tmdb.org/t/p/w342";
        console.log(base_url + "/" + moviePosterPath);
        return base_url + "/" + moviePosterPath;
    }

    $scope.init();
});