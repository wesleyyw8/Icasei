//http://www.omdbapi.com/?t=batman&y=&plot=short&r=json
var app = angular.module('iCasei',['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
	
	$routeProvider.
		when('/principal', {
			templateUrl: '../views/principal.html',
			controller: 'PrincipalController'
		}).
		otherwise({
			redirectTo: '/principal'
		});
}]);
app.controller('PrincipalController', ['$scope','$http','$routeParams', function($scope,$http, routeParams){
	$scope.animate = false;
	$scope.isInvalid = false;
	$scope.movieName = "";
	$scope.searchMovie = function(){
		if ($scope.movieName.trim() == ""){
			$scope.isInvalid = true;
			return;
		}
		$scope.animate = true;
	}
}]);