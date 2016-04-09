//http://www.omdbapi.com/?t=batman&y=&plot=short&r=json
var app = angular.module('iCasei',['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider.
		when('/principal/:movieName/:page', {
			templateUrl: '../views/principal.html',
			controller: 'PrincipalController'
		}).
		when('/principal', {
			templateUrl: '../views/principal.html',
			controller: 'PrincipalController',
			reloadOnSearch: false
		}).
		when('/detalhes/:movieId', {
			templateUrl: '../views/detalhes.html',
			controller: 'DetalhesController',
			reloadOnSearch:false
		}).
		otherwise({
			redirectTo: '/principal'
		});
}]);

angular.module('iCasei').factory('Config', [function() {
	return {
		endpoints: {
	    getMovies: "http://www.omdbapi.com/?s=",
	    page: "&page=",
	    getMoviesDetails: "http://www.omdbapi.com/?i="
		}
	};
}]);