//
//	VENDOR CONTROL
//

obj.controller("vendorCrtl", ['$scope','$http','$log', function($scope, $http, $log){
	
	// $scope.venBusDetails = [{	//
			// personName:'',
			// mobileNum:'',
			// workNum:'',
			// emailid:'',
		    // venContDetails :[{	//LOCAL ARRAYS
			// addressLine1:'',
			// addressLine2:'',
			// addressLine3:'',
			// city:'',
			// state:'',
			// pincode:''
		    // }]
	// }];	
	
	
	
	$scope.venBusDetails = [{	//
			personName:'',
			mobileNum:'',
			workNum:'',
			emailid:''
		}]; 
		$scope.venContDetails = [{	//LOCAL ARRAYS
			addressLine1:'',
			addressLine2:'',
			addressLine3:'',
			city:'',
			state:'',
			pincode:''
		}];
	$scope.venFullAddress=[];  //REST DATA
	$scope.objectIndex = '';
	//$scope.showVendor=false;
	$scope.vendorAddNew=false;
	$scope.availableVendors = false;
	$scope.enEdit = false;  //edit button after modal
	$scope.venDetails=false;
	$scope.venaddDetails=false;
	var countvenBd;
	var countvenCd;
	var countvenCddel;
	var downAdd;
	// $scope.push({
		
	// });
	
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
		// $scope.venBusDetails = []; //LOCAL ARRAYS
		// $scope.venContDetails = []; //LOCAL ARRAYS
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
		console.log("Value of Index ADD func");
		downAdd= $scope.venContDetails.length+1;
		$scope.venContDetails.push({
			addressLine1:'',
			addressLine2:'',
			addressLine3:'',
			city:'',
			state:'',
			pincode:'',
			
		});
		console.log($scope.downAdd);
	}
	// AFTER MODAL CONTACT DETAILS - DEL EXTRA ADDED
	$scope.delContDet = function(index){
		downAdd--;
		$scope.venContDetails.splice(index,1);
		console.log(downAdd);
		if(downAdd<=1)
		{
			$scope.venConDel=false;
			// $scope.topHeader=false;
			// $scope.topDetail=false;
		}
	};
	
	
	$scope.addModalFullDet = function(){
		console.info("Business Details clicked");
		$scope.modalBt=false;
	}
	
	
	$scope.addFullDet = function(){
		$scope.ModalBody=true;
		$scope.venBusDel=false;
		countvenBd = $scope.venBusDetails.length+1;
		$scope.venBusDetails.push({
			personName:'',
			mobileNum:'',
			workNum:'',
			emailid:'',
			
		});
		if(countvenBd>1)
		{
			$scope.venBusDel=true;
		} else{
			$scope.venBusDel=false;
		}
		console.log(countvenBd);
		console.log(countvenCd);
		
	}
	
	$scope.delFullDet = function(index){
		countvenBd--;
		if(countvenBd>1)
		{
			$scope.venBusDel=true;
		} else{
			$scope.venBusDel=false;
		}
		$scope.venBusDetails.splice(index,1);
		
	};
	$scope.dataAfterModal = function(vendet){
		$scope.afterModal=true;
		$scope.enEdit=true;
		$scope.modalBt=false;
		console.log("After details function");
		//	DISPLAY WITH REPEAT
		//
		console.log("Vendet Details From form");
		console.log($scope.vendet);
		console.log("Vendet Business details to form");
		// $scope.venBusDetails[$scope.objectIndex] = $scope.vendet;
		
		// var index = $scope.itemsToAdd.indexOf(itemToAdd);
		// console.log(index);
        // $scope.itemsToAdd.splice(index, 1);
		
		$scope.venBusDetails.push(angular.copy($scope.vendet))
		console.log($scope.vendet);
		// console.log(angular.toJson(venBusDetails));
		// console.log(angular.toJson($scope.venBusDetails));
		
		
	};
	
	//$scope.vendorAddNew=true;
	
	$scope.saveVenFormData = function(vendet){
		console.log($scope.vendet);
		
		$scope.venFullAddress.push({'businessId':$scope.vendet.businessId, 'vendorName':$scope.vendet.vendorName, 'tinNum':$scope.vendet.tinNum, 'staxNum':$scope.vendet.staxNum, 'cstNum':$scope.vendet.cstNum, 'panNum':$scope.vendet.panNum, 'personName':$scope.venBusDetails[0].personName, 'mobileNum':$scope.venBusDetails[0].mobileNum, 'workNum':$scope.venBusDetails[0].workNum, 'emailid':$scope.venBusDetails[0].emailid, 'addressLine1':$scope.venContDetails[0].addressLine1, 'addressLine2':$scope.venContDetails[0].addressLine2, 'addressLine3':$scope.venContDetails[0].addressLine3, 'city':$scope.venContDetails[0].city, 'state':$scope.venContDetails[0].state, 'pincode':$scope.venContDetails[0].pincode});
		
		// $scope.venFullAddress.push({'businessId':$scope.vendet.businessId, 'vendorName':$scope.vendet.vendorName, 'tinNum':$scope.vendet.tinNum, 'staxNum':$scope.vendet.staxNum, 'cstNum':$scope.vendet.cstNum, 'panNum':$scope.vendet.panNum, 'personName':$scope.venBusDetails[0].personName, 'mobileNum':$scope.venBusDetails[0].mobileNum, 'workNum':$scope.venBusDetails[0].workNum, 'emailid':$scope.venBusDetails[0].emailid, 'addressLine1':$scope.venBusDetails[0].venContDetails[0].addressLine1, 'addressLine2':$scope.venBusDetails[0].venContDetails[0].addressLine2, 'addressLine3':$scope.venBusDetails[0].venContDetails[0].addressLine3, 'city':$scope.venBusDetails[0].venContDetails[0].city, 'state':$scope.venBusDetails[0].venContDetails[0].state, 'pincode':$scope.venBusDetails[0].venContDetails[0].pincode});
		
		
		
		
		 // $scope.venFullAddress.push({ 'vendorName':$scope.name, 'tinNum': $scope.tinNum, 'staxNum':$scope.staxNum, 'cstNum':$scope.cstNum, 'panNum':$scope.panNum});
		 // $scope.venBusDetails.push({'personName':$scope.vendet.personName, 'mobileNum':$scope.vendet.mobileNum, 'workNum':$scope.vendet.workNum, 'emailid':$scope.vendet.emailid});
		 // $scope.venContDetails.push({'addressLine1':$scope.addressLine1, 'addressLine2':$scope.addressLine2, 'addressLine3':$scope.addressLine3, 'city':$scope.city, 'state':$scope.state, 'pincode':$scope.pincode});
		
		// Writing it to the server
		//		
		// var dataObj = {
				// vendorName : $scope.vendet.name,
				// tinNum : $scope.vendet.tinNum,
				// staxNum : $scope.vendet.staxNum,
				// cstNum : $scope.vendet.cstNum
		// };	
		// var dataObj = $scope.vendet;
		var dataObj = $scope.venFullAddress;
		// console.log($scope.dataObj);
		
		$http.get('/showVendors').success(function(data){
			console.log(angular.toJson(data));
		});
		var res = $http.post('http://localhost:8080/dman/mm', dataObj);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		

		// Making the fields empty
		//
		$scope.vendet.businessId='';
		$scope.vendet.vendorName='';
		$scope.vendet.tinNum='';
		$scope.vendet.staxNum='';
		$scope.vendet.cstNum='';
		$scope.vendet.panNum='';
		$scope.venBusDetails[0].personName='';
		$scope.venBusDetails[0].mobileNum='';
		$scope.venBusDetails[0].workNum='';
		$scope.venBusDetails[0].emailid='';
		$scope.venContDetails=[];
	};
	
	
	//Printable Area
	// Issue is after print, other functions doesnot work
	// $scope.printdiv = function (divName) {
     // var printContents = document.getElementById(divName).innerHTML;
     // var originalContents = document.body.innerHTML;

     // document.body.innerHTML = printContents;

     // window.print();

     // document.body.innerHTML = originalContents;
	// };
	


}]);
