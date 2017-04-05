var std = angular.module("studentsApp",[]);
std.controller("homeController", function($scope){
	$scope.showMarks=false;
	$scope.studentM=[];
	$scope.dispdata=[];
	$scope.studentMarks =[{
			subone:'',
			subtwo:'',
			subthree:'',
			subfour:''
			
		}];
	$scope.addMarks = function (){
		$scope.showMarks=true;
		var inc;
		// var rowConut = $scope.studentMarks.length +1;
		// for(inc=0;inc<=rowConut;inc++)
		// {
			
		// }
		$scope.studentMarks.push({
			subone:'',
			subtwo:'',
			subthree:'',
			subfour:''
			
		});
		
		// console.log(rowConut);
		console.log($scope.studentMarks);
	};
	
	$scope.delMarks = function (index){
		rowConut = $scope.studentMarks.length -1;
		$scope.studentMarks.splice(index,1);
		console.log("Delete Function");
		console.log(rowConut);
		// console.log($scope.studentMarks);

	};
	
	$scope.saveFullForm = function(formData){
		//
		
		console.log("Save Function");
		console.log($scope.formData);
		console.log($scope.studentMarks);
		  var index = $scope.studentMarks.indexOf(formData);

		$scope.studentMarks.splice(index, 1);

		$scope.dispdata.push(angular.copy(formData))
		console.log($scope.formData);
		console.log($scope.studentMarks);
		
		// for(inc=1;inc<=4;inc++)
		// {
			// console.log($scope.studentMarks.formData[inc]);
		// }
		// console.log($scope.marks);
		
	};
});