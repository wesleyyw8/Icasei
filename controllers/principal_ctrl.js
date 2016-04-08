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