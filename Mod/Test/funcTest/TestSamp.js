    var app = angular.module('plunker', []);

    app.controller('MainCtrl', function($scope) {

      $scope.items = [];

      $scope.itemsToAdd = [{
		regno:'',
		section:'',
        firstName: '',
        lastName: ''
      }];

      $scope.add = function(itemToAdd) {
	
        var index = $scope.itemsToAdd.indexOf(itemToAdd);
		console.log(index);
        $scope.itemsToAdd.splice(index, 1);
		itemToAdd.regno = $scope.itemsToAdd.regno;
		itemToAdd.section = $scope.itemsToAdd.section;


		$scope.items.push(angular.copy(itemToAdd))
		console.log($scope.items);
      }

      $scope.addNew = function() {

        $scope.itemsToAdd.push({
          firstName: '',
          lastName: ''
        })
      }
    });