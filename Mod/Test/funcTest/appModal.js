var std = angular.module("modalApp",[]);
std.controller("homeController", function($scope){
	$scope.showMarks=false;
	$scope.studentMarks=[];
	
	$scope.addMarks = function (){
		$scope.showMarks=true;
		var inc;
		var rowConut = $scope.studentMarks.length +1;
		for(inc=0;inc<=rowConut;inc++)
		{
			
		}
		$scope.studentMarks.push({
			subone:0,
			subtwo:0,
			subthree:0,
			subfour:0,
			
		});
		console.log(rowConut);
		console.log($scope.studentMarks);
	};
	
	$scope.delMarks = function (index){
		rowConut = $scope.studentMarks.length -1;
		$scope.studentMarks.splice(index,1);
		console.log(rowConut);
		console.log($scope.studentMarks);

	};
	
	$scope.saveFullForm = function(){
		//
		
		console.log($scope.formData);
		console.log($scope.marks);
		console.log($scope.studentMarks);
	};
});