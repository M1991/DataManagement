var salesApp = angular.module("salesApp",[]);

salesApp.controller('salesDetailsController',
				function($rootScope, $scope, $http) {
					$scope.purchaseOrderList = [];
					$scope.quotationList = [];
					$scope.inventoryList = [];
					$scope.salesList = [];
					$scope.InwardDCList = [];
					$scope.searchResList = [];
					
					$scope.styleClassH = "active";
					$scope.isHome = true;
					$scope.infoPanel = false;
					
					$scope.styleClassP = "";
					$scope.isPurchase = "";
					
					$scope.styleClassQ = "";
					$scope.Quotation = "";
					
					$scope.styleClassT = "";
					$scope.Invoice = "";
					
					$scope.styleClassU = "";
					$scope.Payable = "";
					
					$scope.styleClassV = "";
					$scope.Receivable = "";
					
					$scope.styleClassI = "";
					$scope.isInventory = "";
					
					$scope.styleClassS = "";
					$scope.isSales = "";
					
					$scope.isIDC = "";
					
					$scope.isItemMaster = false;
					
					$scope.isSearch = false;
					
					$scope.enableEdit = true;
					
					$scope.reference = 'Select Reference';
					$scope.referenceVal = '';
					$scope.references = "Invoice#,PO#";
					$scope.inputRef = false;
					$scope.inputPayment = false;
					
					$scope.bankList = "Canara Bank,State Bank Of India,Union Bank,CITI Bank";
					$scope.modeType = "Cheque#,A/C#,A/C Type";
					$scope.acType = "Savings, Current";
					$scope.isBank = false;
					$scope.showBankDetails = false;
					
					$scope.isCash = false;
					
					$scope.isExpenses = false;
					$scope.paymentList = "Cash,Cheque,NEFT,RTGS,DD,Credit/Debit Card";
					$scope.newVendorDetails = {};
					$scope.newItemMasterDetails = {};
					
					var clear = function() {
						$scope.styleClassH = "";
						$scope.isHome = "";
						$scope.styleClassP = "";
						$scope.isPurchase = "";
						$scope.styleClassQ = "";
						$scope.styleClassT = "";
						$scope.styleClassU = "";
						$scope.styleClassV = "";
						$scope.isQuotation = "";
						$scope.isInvoice = "";
						$scope.isPayable = "";
						$scope.isReceivable = "";
						$scope.styleClassI = "";
						$scope.isInventory = "";
						$scope.styleClassS = "";
						$scope.isSales = "";
						$scope.isIDC = "";
						$scope.isEnquiry = "";
						$scope.isItemMaster = false;
						$scope.add = false;
						$scope.addQuote = false;
						$scope.isSearch = false;
						$scope.isAddNewItem = false;
						$scope.searchRes = false;
						$scope.enableEdit = false;
						$scope.searchResList = [];
						$scope.checked='';
						$scope.isVendor = false;
						$scope.addNewVendor = false;
						$scope.isBank = false;
						$scope.showBankDetails = false;
						$scope.isCash = false;
						$scope.isExpenses = false;
						$scope.inputRef = false;
						$scope.inputPayment = false;
						$scope.newVendorDetails = {};
						$scope.newItemMasterDetails = {};
					}
					$scope.showHome = function() {
						clear();
						$scope.styleClassH="active";
						$scope.isHome = true;
					}
					
					$scope.showPurchaseOrder = function() {
						clear();
						$scope.styleClassP="active";
						$scope.isPurchase = true;
						
					}
					$scope.showQuotation = function() {
						clear();
						$scope.styleClassQ="active";
						$scope.isQuotation = true;
					}
					
					$scope.showInvoice = function() {
						clear();
						$scope.styleClassT="active";
						$scope.isInvoice = true;
					}
					
					$scope.showPayable = function() {
						clear();
						$scope.styleClassU="active";
						$scope.isPayable = true;
					}
					
					$scope.showReceivable = function() {
						clear();
						$scope.styleClassV="active";
						$scope.isReceivable = true;
					}
					
					$scope.showEnquiry = function() {
						clear();
						$scope.styleClassQ="active";
						$scope.isEnquiry = true;
					}
					
					$scope.showInventory = function() {
						clear();
						$scope.styleClassI="active";
						$scope.isInventory = true;
					}
					
					$scope.showSales = function() {
						clear();
						$scope.styleClassS="active";
						$scope.isSales = true;
					}
					
					$scope.addItems = function() {
						$scope.add = true;
						 $scope.purchaseOrderList.push({
							 	itemId:0,
							 	itemName : '' ,
								uom: '',
							 	quantity : 0,
							 	unitPrice : 0,
								amount: '',
								discount: 0
					  });
						 
					}
					$scope.addQuotation = function() {
						$scope.addQuote = true;
						 $scope.quotationList.push({
							 	itemId:0,
							 	itemName : '' ,
								uom: '',
							 	quantity : 0,
							 	unitPrice : 0,
								amount: '',
								discount: 0
					  });
						 
					}
					$scope.openInputBox = function() {
						$scope.existingVen = true;
						$scope.showSubmit = true;
						$scope.addInventory = false;
						$scope.addVendor = false;
					}
					$scope.submitVendorId = function(vendorId) {
						$scope.showSubmit = false;
						$scope.addInventory = true;
						$scope.inventoryList.push({
							itemId: '',
							unitPrice: 0,
							noOfUnits: 0,
							totalPrice: 0
						})
					}
					$scope.addNewVendor = function() {
						$scope.addVendor = true;
						$scope.showSubmit = false;
						$scope.addInventory = false;
					} 
					$scope.addSales = function() {
						$scope.addSalesDetails = true;
						 $scope.salesList.push({
							 	itemId: '',
							 	vendorId : '' , 
							 	quantitySold: 0,
							 	unitPrice: 0,
							 	TotalAmt: 0
					  });						 
					}
					$scope.showIDC = function() {
						clear();
						$scope.isIDC = true;
					}
					$scope.addIDC = function() {
						$scope.InwardDC = true;
						$scope.InwardDCList.push({
							itemId: '',
							itemName:'',
							quantity:0,
							unitPrice: 0,
							totalAmt: 0
						});
					}
					
					$scope.showItemMaster = function() {
						clear();
						$scope.isItemMaster = true;
					}
					$scope.showSearch = function(value) {
						$scope.checked=value;
						$scope.isSearch = true;
						$scope.isAddNewItem = false;
					}
					$scope.showNewItem = function(value) {
						$scope.checked=value;
						$scope.isSearch = false;
						$scope.isAddNewItem = true;
						$scope.searchRes = false;
						$scope.enableEdit = false;
						$scope.searchResList = [];
						$scope.addNewItem = true;
					}
					$scope.showSearchResults = function() {
						$scope.searchRes = true;
						$scope.enableEdit = true;
						$scope.searchResList.push({
							itemId: '',
							itemName:'',
							noOfUnits:0,
							unitPrice: 0							
						});
					}
					$scope.enableEditF = function(itemId) {
						$scope.enableEdit = false;
					}
					$scope.showVendors = function() {
						clear();
						$scope.isVendor = true;
						$scope.addNewVendor = true;
					}
					$scope.displayRefVal = function(value) {
						if("Invoice#" == value) {
							$scope.inputRef = true;
							$scope.referenceVal = 'Invoice#';
						} else if("PO#" == value) {
							$scope.inputRef = true;
							$scope.referenceVal = 'PO#';
						} else {
							$scope.inputRef = false;
							$scope.referenceVal = '';
						}
					}
					$scope.showBank = function() {
						clear();
						$scope.isBank = true;
					}
					$scope.handleBankChange = function() {
						$scope.showBankDetails = true;
						
					}
					$scope.showCash = function() {
						clear();
						$scope.isCash = true;
					}
					$scope.showExpenses = function() {
						clear();
						$scope.isExpenses = true;
					}
					$scope.handlePaymentMode = function(selected) {
						if("Cheque" == selected) {
							$scope.inputPayment = true;
							$scope.paymentLabel = "Cheque#";
						} else if("NEFT" == selected || "RTGS" == selected) {
							$scope.inputPayment = true;
							$scope.paymentLabel = "Txn#";
						} else if("DD" == selected) {
							$scope.inputPayment = true;
							$scope.paymentLabel = "DD#";
						} else if("Credit/Debit Card" == selected) {
							$scope.inputPayment = true;
							$scope.paymentLabel = "#";
						} else {
							$scope.inputPayment = false;
							$scope.paymentLabel = "";
						}
					}
					
					$scope.addNewVendorDetails = function() {
						var address = {
								address1 : $scope.newVendorDetails.addressLine1,
								address2 : $scope.newVendorDetails.addressLine2,
								address3 : $scope.newVendorDetails.addressLine3,
								city : $scope.newVendorDetails.city,
								state : $scope.newVendorDetails.state,
								country : $scope.newVendorDetails.country,
								pincode : $scope.newVendorDetails.pincode
						}
						var contact = {
								personName : $scope.newVendorDetails.personName,
								mobileNum : $scope.newVendorDetails.mobileNum,
								workNum : $scope.newVendorDetails.workNum,
								homeNum : $scope.newVendorDetails.homeNum
						}
						var newVendorObj = {
							businessId : $scope.newVendorDetails.businessId,
							name : $scope.newVendorDetails.name,
							tinNum : $scope.newVendorDetails.tinNum,
							stastNum : $scope.newVendorDetails.stastNum,
							cstNum : $scope.newVendorDetails.cstNum,
							panNum : $scope.newVendorDetails.panNum,
							address : address,
							contact : contact
						}
						var newVendorRes = $http.post('/vendor', newVendorObj);
						newVendorRes
								.success(function(data, status, headers, config) {
									//$scope.message = "Authentication Saved Successfully";
									//$scope.showSubmit = false;
									setNewVendorObj(data);
									/*$scope.showAuthSend = true;
									var message = 'Registration saved Successfully';
									displayMessage('msg',message);*/
									//$scope.cssClass = "msg";
									
								});
						newVendorRes.error(function(data, status, headers, config) {
							/*var message = 'Failed to Save Registration';
							displayMessage('error',message);*/
						});
					}
					
					function setNewVendorObj(data) {
						$scope.newVendorDetails = {};
						$scope.newVendorDetails.addressLine1 = data.address.address1;
						$scope.newVendorDetails.addressLine2 = data.address.address2;
						$scope.newVendorDetails.addressLine3 = data.address.address3;
						$scope.newVendorDetails.city = data.address.city;
						$scope.newVendorDetails.state = data.address.state;
						$scope.newVendorDetails.country = data.address.country;
						$scope.newVendorDetails.pincode = data.address.pincode;
						$scope.newVendorDetails.personName = data.contact.personName;
						$scope.newVendorDetails.mobileNum = data.contact.mobileNum;
						$scope.newVendorDetails.workNum = data.contact.workNum;
						$scope.newVendorDetails.homeNum = data.contact.homeNum;
						$scope.newVendorDetails.businessId = data.businessId;
						$scope.newVendorDetails.name = data.name;
						$scope.newVendorDetails.tinNum = data.tinNum;
						$scope.newVendorDetails.stastNum = data.stastNum;
						$scope.newVendorDetails.cstNum = data.cstNum;
						$scope.newVendorDetails.panNum = data.panNum;
					}
					
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
										
									});
						newItemMasRes.error(function(data, status, headers, config) {
								/*var message = 'Failed to Save Registration';
								displayMessage('error',message);*/
							});
					}
					function setNewItemMasObj(data) {
						$scope.newItemMasterDetails = {};
						$scope.newItemMasterDetails.itemId = data.itemId;
						$scope.newItemMasterDetails.itemName = data.itemName;
						$scope.newItemMasterDetails.description = data.itemDescription;
						$scope.newItemMasterDetails.specification = data.itemSpecification;
						$scope.newItemMasterDetails.uom = data.itemUom;
						
						/*$scope.newItemMasterDetails.vendorId = data.vendorId;
						$scope.newItemMasterDetails.vendorName = data.vendorName;
						$scope.newItemMasterDetails.vendorAddress = data.vendorAddress;
						var itemListData = data.itemList;*/
						
						/*for(var i = 0 ;itemListData.length;i++ ) {
								$scope.quotationList.push({
								 	itemId : itemListData[i].itemId,
								 	itemName : itemListData[i].itemName ,
									uom: itemListData[i].uom ,
								 	quantity : itemListData[i].quantity,
								 	unitPrice : itemListData[i].unitPrice,
									amount: itemListData[i].amount,
									discount: itemListData[i].discount
						  });
						}*/
					}					
				}
			);
