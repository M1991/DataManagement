

obj.controller("itemMasterAddCtrl", function($scope){
	$scope.isAddNewItem=false;
	$scope.isSearch=false;

	$scope.searchResList=[];
	
	// UNCHECK A RADIO BUTTON
/*	$scope.uncheck = function (event) {
    if ($scope.addItem == event.target.value)
        $scope.addItem = false
	}	*/
	
	$scope.showNewItem = function(addItem){
		$scope.isAddNewItem=true;
		$scope.isSearch=false;
		$scope.searchRes = false;
		$scope.enableEdit = false;
		$scope.searchResList=[];
		$scope.addNewItem = true;
		
		console.log(addItem);
	};
	
	

	
	$scope.showSearchResults = function(addItem) {
		$scope.searchRes = true;
		$scope.enableEdit = true;
		//$scope.searchResList=;
		$scope.searchResList.push({
			itemId: '',
			itemName:'',
			noOfUnits:0,
			unitPrice: 0,
			
		});
	}
	
	$scope.enableDel = function (itemId){
		$scope.searchResList.pop();

	};
/*
	$scope.addNewItem = function(addItemMaster){
		$scope.ItemMasterList=[];
		var itemCount = $scope.ItemMasterList.length+1;
		//console.log($scope.addItemMaster);
		//console.log(ItemCount);
		
		$scope.ItemMasterList.push({
			itemId: '',
			itemName:'',
			description:'',
			specification:'',
			uom:'',
			
		});
		//console.log($scope.ItemMasterList);
	};*/
	
	$scope.enableEditF = function(itemId) {
		$scope.enableEdit = false;
	};
	
	$scope.showSearch = function(addItem){
		$scope.isSearch=true;
		$scope.isAddNewItem=false;
			console.log(addItem);
		
	};
	
	/*
	//	ADD ITEM MASTER ON SUBMIT
	$scope.addNewItemMaster = function () {
						var newItemMasObj = {
								itemId : $scope.newItemMasterDetails.itemId,
								itemName : $scope.newItemMasterDetails.itemName,
								itemDescription : $scope.newItemMasterDetails.description,
								itemSpecification : $scope.newItemMasterDetails.specification,
								itemUom : $scope.newItemMasterDetails.uom
							}
							var newItemMasRes = $http.post('/dman/mm/items', newItemMasObj);
						newItemMasRes
									.success(function(data, status, headers, config) {
										//$scope.message = "Authentication Saved Successfully";
										//$scope.showSubmit = false;
										setNewItemMasObj(data);
										/*$scope.showAuthSend = true;
										var message = 'Registration saved Successfully';
										displayMessage('msg',message);*/
										//$scope.cssClass = "msg";
										
		//							});
		//				newItemMasRes.error(function(data, status, headers, config) {
								/*var message = 'Failed to Save Registration';
								displayMessage('error',message);*/
		//					});
//	}
	
		
});
