app.controller('DetalhesController', ['$scope','$location',"$http", "Config","$route" ,function($scope, $location, $http, Config, $route){
	if (angular.isDefined($route.current.params.movieId))
		loadMovieDetails();
	$scope.loading = false;
	function loadMovieDetails(){
		$scope.loading = true;
		$http.get(Config.endpoints.getMoviesDetails + $route.current.params.movieId).then(function(data){
			$scope.loading = false;
			$scope.poster = data.data.Poster;
			delete data.data.Poster;
			$scope.movieDetail = data.data;
		});
	};
}]);