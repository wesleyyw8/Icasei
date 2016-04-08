//http://www.omdbapi.com/?t=batman&y=&plot=short&r=json
var app = angular.module('iCasei',['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider.
		when('/principal/:movieName', {
			templateUrl: '../views/principal.html',
			controller: 'PrincipalController'
		}).
		when('/principal', {
			templateUrl: '../views/principal.html',
			controller: 'PrincipalController'
		}).
		otherwise({
			redirectTo: '/principal'
		});
}]);

angular.module('iCasei').factory('Config', [function() {
	return {
		endpoints: {
	    getMovies: "http://www.omdbapi.com/?s=",
	    page: "&page="
		}
	};
}]);
app.controller('PrincipalController', ['$scope','$http','$routeParams', "Config", "$timeout", function($scope,$http, routeParams, Config, $timeout){
	$scope.animate = false;
	$scope.isInvalid = false;
	$scope.movieName = "batman";
	
	
	$scope.searchMovie = function(){
		if ($scope.movieName.trim() == ""){
			$scope.isInvalid = true;
			return;
		}
		$scope.animate = true;
		$timeout(function(){
			$http.get(Config.endpoints.getMovies+$scope.movieName).then(function(resp){
				$scope.movies = resp.data.Search;
				console.log($scope.movies);
			});
		},2000);
	}
}]);