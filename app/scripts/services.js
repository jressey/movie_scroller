angular.module('movieScrollerApp.services', []).factory('movieService', function($q, $http) {

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
});