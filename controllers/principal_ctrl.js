app.controller('PrincipalController', ['$scope','$http','$routeParams', "Config", "$timeout",
 function($scope,$http, routeParams, Config, $timeout){
	$scope.animate = false;
	$scope.isInvalid = false;
	$scope.movieName = "batman";
	$scope.currentPage = 1;
	$scope.loading = false;
	$scope.searchMovie = function(){
		if ($scope.movieName.trim() == ""){
			$scope.isInvalid = true;
			return;
		}
		$scope.currentPage = 1;
		$scope.animate = true;
		$scope.loading = true;
		$timeout(function(){
			populateMovies();
		},2000);
	};
	function populateMovies(){
		$scope.movies = [];
		$timeout(function(){
			$scope.loading = true;
			$http.get(Config.endpoints.getMovies+$scope.movieName+Config.endpoints.page+$scope.currentPage).then(function(resp){
				$scope.movies = resp.data.Search;
				console.log($scope.movies);
				$scope.loading = false;
			});
		},0);
	};
	$scope.nextPage = function(){
		$scope.currentPage++;
		populateMovies();
	};
	$scope.previouslyPage = function(){
		if ($scope.currentPage > 1){
			$scope.currentPage--;
			populateMovies();
		}
	};
}]);