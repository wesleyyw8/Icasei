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
app.controller('PrincipalController', ['$scope','$http', "Config", "$timeout","$location",
 function($scope,$http, Config, $timeout, $location){
	$scope.animate = false;
	$scope.isInvalid = false;
	$scope.currentPage = 1;
	$scope.loading = false;
	$scope.movieName = "";
	if (angular.isDefined($location.search().movieName) && angular.isDefined($location.search().page) ){
		$scope.movieName = $location.search().movieName;
		$scope.currentPage = parseInt($location.search().page);
		
		var el = document.getElementById('textFieldContainer');
		if(el)
    	el.className += 'is-focused';
  	
		$scope.animate = true;
		populateMovies();
	}
	$scope.searchMovie = function(){
		if ($scope.movieName.trim() == ""){
			$scope.isInvalid = true;
			return;
		}
		$location.search('movieName', $scope.movieName);
		$scope.currentPage = 1;
		$scope.animate = true;
		$scope.loading = true;
		updateUrlParams();
		$timeout(function(){
			populateMovies();
		},2000);
	};
	function populateMovies(){
		$scope.movies = [];
		$timeout(function(){
			$scope.loading = true;
			$http.get(Config.endpoints.getMovies+$location.search().movieName+Config.endpoints.page+$location.search().page).then(function(resp){
				if (angular.isDefined(resp.data.Search))
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
		//$location.search('movieName', $scope.movieName);
		$location.search('page', $scope.currentPage);
	};
	$scope.moreInformation = function(id){
		//$location.path('/detalhes/'+id);
		$location.url('/detalhes/'+id);
	};
}]);