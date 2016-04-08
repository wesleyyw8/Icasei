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
app.controller('PrincipalController', ['$scope','$http', "Config", "$timeout","$location",
 function($scope,$http, Config, $timeout, $location){
	$scope.animate = false;
	$scope.isInvalid = false;
	$scope.movieName = "batman";
	$scope.currentPage = 1;
	$scope.loading = false;

	if (angular.isDefined($location.search().movieName) && angular.isDefined($location.search().page) )
		populateMovies();
	$scope.searchMovie = function(){
		if ($scope.movieName.trim() == ""){
			$scope.isInvalid = true;
			return;
		}
		$scope.currentPage = 1;
		$scope.animate = true;
		$scope.loading = true;
		updateUrlParams();
		$timeout(function(){
			populateMovies();
		},2000);
	};
	//$location.search('id', 123);
	function populateMovies(){
		$scope.movies = [];
		$timeout(function(){
			$scope.loading = true;
			$http.get(Config.endpoints.getMovies+$location.search().movieName+Config.endpoints.page+$location.search().page).then(function(resp){
				$scope.movies = resp.data.Search;
				console.log($scope.movies);
				$scope.loading = false;
			});
		},0);
	};
	$scope.nextPage = function(){
		$scope.currentPage++;
		updateUrlParams();
		populateMovies();
	};
	$scope.previouslyPage = function(){
		if ($scope.currentPage > 1){
			$scope.currentPage--;
			updateUrlParams();
			populateMovies();
		}
	};
	function updateUrlParams(){
		$location.search('movieName', $scope.movieName);
		$location.search('page', $scope.currentPage);
	}
}]);