
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'pages/main.html', 
			controller: 'mainCtrl'
		})
		.when('/forecast', {
				templateUrl: 'pages/forecast',
				controller: 'forecastCtrl'
		})

});

weatherApp.service('cityService', function(){
	this.city = 'Auckland';
})


weatherApp.controller('mainCtrl', ['$scope', '$location', function($scope, cityService){
	$scope.name = 'main';

	$scope.city = cityService.city;

	$scope.$watch('city', function(){

		cityService.city = $scope.city;
	})
}]);


weatherApp.controller('forecastCtrl', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
	
	$scope.name = 'forecast';

	$scope.city = cityService.city;

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
		{callback: "JSON_CALLBACK"}, { get: { method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2});
		
	// OpenWeatherMap API returns temperature in degrees Kelvin.
  	
  	$scope.convetToDate = function(dt){
  		return new Date(dt * 1000);
  	};

}]);