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