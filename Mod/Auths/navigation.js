var navigationApp = angular.module("authenticationApp", [ 'ngResource']);

navigationApp
.controller(
		'authenticationController',
		function($scope, $http, $resource) {
			$scope.loginDetails = {};
			
			$scope.authenticate = function() {
				alert("Inside auth");
				var authDataObj = {
						login : $scope.loginDetails.username,
						password : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse($scope.loginDetails.password)),
						msmServerUrl : $scope.loginDetails.msmServerUrl
					};
					var authRes = $http.post('/authenticateMSM', authDataObj);
					authRes.success(function(data, status, headers, config) {
								//$scope.message = "Authentication Saved Successfully";
								alert("data = "+data);
								//$scope.cssClass = "msg";
								});
					authRes.error(function(data, status, headers, config) {
						alert("error = "+data);
					});
			}
		});
