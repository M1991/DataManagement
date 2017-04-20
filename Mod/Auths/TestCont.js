//
//	VENDOR CONTROL
//
obj.controller("vendorCrtl", ['$scope','$http','$log', function($scope, $http, $log){
	$scope.venBusDetails = [{	
	}]; //LOCAL ARRAYS
	$scope.venContDetails = []; //LOCAL ARRAYS
	$scope.venFullAddress=[];  //REST DATA
	$scope.objectIndex = '';
	$scope.vendorAddNew=false;
	$scope.availableVendors = false;
	$scope.enEdit = false;  //edit button after modal
	$scope.venDetails=false;
	$scope.venaddDetails=false;
	var countvenBd;
	var countvenCd;
	var countvenCddel;
	
	$scope.showNewItem = function(vendorItem){
		$scope.vendorAddNew=true;
		$scope.modalBt=true;
		$scope.availableVendors = false;
		$scope.delAddButton=false;
		$scope.afterModal=false;
		$scope.venConDel=false;
	
		console.log(vendorItem);
	};
	
	$scope.showSearch = function(vendorItem) {
		$scope.venBusDetails = []; //LOCAL ARRAYS
		$scope.venContDetails = []; //LOCAL ARRAYS
		$scope.vendorAddNew=false;
		$scope.venDetails=false;
		$scope.venaddDetails=false;
		
		$scope.searchRes = true;
		$scope.availableVendors = true;
		
		console.log(vendorItem);
	};
	
	// AFTER MODAL CONTACT DETAILS - ADD MORE
	$scope.addContDet = function(index){
		$scope.venConDel=true;
		console.log("Value of Index ADD func",$scope.index);
		var downAdd= $scope.venContDetails.length+1;
		$scope.venContDetails.push({
			addressLine1:'',
			addressLine2:'',
			addressLine3:'',
			city:'',
			state:'',
			pincode:'',
			
		});
	};
	// AFTER MODAL CONTACT DETAILS - DEL EXTRA ADDED
	$scope.delContDet = function(index){
		countvenCddel = $scope.venContDetails.length-1;
		$scope.venContDetails.splice(index,1);
		console.log(countvenCddel);
		if(countvenCddel<=1)
		{
			$scope.venConDel=false;
			// $scope.topHeader=false;
			// $scope.topDetail=false;
		}
	};
	
	
	$scope.addModalFullDet = function(index){
		$scope.ModalBody=true;
		$scope.venaddDetails=false;
		$scope.venaddDetails=true;
		countvenBd = $scope.venBusDetails.length+1;
			$scope.venBusDetails.push({
			personName:'',
			mobileNum:'',
			workNum:'',
			emailid:'',
			
		});
		// addContDet(index);
		countvenCd = $scope.venContDetails.length+1;
		$scope.venContDetails.push({
			addressLine1:'',
			addressLine2:'',
			addressLine3:'',
			city:'',
			state:'',
			pincode:'',
			
		});
		console.log(countvenBd);
		console.log(countvenCd);
		$scope.modalBt=false;
	}
	
	
	$scope.addFullDet = function(index){
		$scope.ModalBody=true;
		addModalFullDet(index);
		// countvenBd = $scope.venBusDetails.length+1;
		// $scope.venBusDetails.push({
			// personName:'',
			// mobileNum:'',
			// workNum:'',
			// emailid:'',
			
		// });
		// countvenCd = $scope.venContDetails.length+1;
		// $scope.venContDetails.push({
			// addressLine1:'',
			// addressLine2:'',
			// addressLine3:'',
			// city:'',
			// state:'',
			// pincode:'',
			
		// });
		console.log(countvenBd);
		console.log(countvenCd);
		
	};
	
	
	$scope.dataAfterModal = function(addVen){
		$scope.afterModal=true;
		$scope.enEdit=true;
		$scope.modalBt=false;
		console.log("After details function");
		//	DISPLAY WITH REPEAT
		//
		//$scope.venaddDetails=true;
		//$scope.venAddress=[];
		console.log("Vendet Details From form");
		console.log($scope.vendet);
		console.log("Vendet Business details to form");
		console.log($scope.venBusDetails);
		if($scope.venBusDetails[$scope.objectIndex] == null) {
				$scope.venBusDetails.push($scope.vendet);
			} else {
				$scope.venBusDetails[$scope.objectIndex] = $scope.vendet;
			}
		// newItemVen = $scope.venBusDetails.length+1;
		// $scope.venBusDetails.push({
			// personName:'',
			// mobileNum:'',
			// workNum:'',
			// emailid:'',
			
		// });
		
	};
	
	//$scope.vendorAddNew=true;
	
	$scope.saveVenFormData = function(vendet){
		console.log($scope.vendet);
		$scope.venFullAddress.push({ 'vendorName':$scope.name, 'tinNum': $scope.tinNum, 'staxNum':$scope.staxNum, 'cstNum':$scope.cstNum, 'panNum':$scope.panNum});
		// Writing it to the server
		//		
		// var dataObj = {
				// vendorName : $scope.vendet.name,
				// tinNum : $scope.vendet.tinNum,
				// staxNum : $scope.vendet.staxNum,
				// cstNum : $scope.vendet.cstNum
		// };	
		var dataObj = $scope.vendet;
		

		var res = $http.post('http://localhost:8080/dman/mm', dataObj);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
				// Making the fields empty
		//
		$scope.vendorName='';
		$scope.tinNum='';
		$scope.staxNum='';
		$scope.cstNum='';
		$scope.panNum='';
	};
	
	
	//Printable Area
	// Issue is after print functions doesnot work
	// $scope.printdiv = function (divName) {
     // var printContents = document.getElementById(divName).innerHTML;
     // var originalContents = document.body.innerHTML;

     // document.body.innerHTML = printContents;

     // window.print();

     // document.body.innerHTML = originalContents;
	// };
	
}]);
