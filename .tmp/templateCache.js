angular.module('twitterApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<br> <div class=\"container\"> <h1>Most popular movies</h1> </div> <br> <div class=\"dynamic-grid\" angular-grid=\"movies\" ag-grid-width=\"185\" ag-gutter-size=\"0\" ag-id=\"gallery\" ag-refresh-on-img-load=\"false\" ag-infinite-scroll=\"getMovies()\" ng-infinite-scroll-distance=\"3\"> <div data-ng-repeat=\"m in movies\" class=\"grid\"> <span class=\"title\">{{m.title}}</span> <img ng-src=\"{{m.poster_url}}\" class=\"grid-img\" data-actual-width=\"185px\" data-actual-height=\"278px\"> </div> </div> <div ng-show=\"movieError\"> Sorry, something went wrong </div> "
  );

}]);
