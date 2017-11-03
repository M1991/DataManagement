	
	var logObj = angular.module("", []);
		logObj.controller("", function($scope){
				$scope.username = '';
				$scope.password = '';

				$scope.message = '';

				$scope.login = function() {
				  // login example function with ajax request and success/error promises
				  myLogin($scope.username, $scope.password)
					.success(function() {
					  $scope.message = 'Logged in!';
					})
					.error(function(errorMessage) {
					  $scope.message = errorMessage;
					})
				}


		});