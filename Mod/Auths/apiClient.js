function removeCss() {
	$('#cssClass').removeClass('error');
	$('#cssClass').removeClass('msg');
}

function displayMessage(cssClass, message) {
	var header = '';
	if('error' == cssClass) {
		header = 'Error!';
	} else {
		header = 'Success!';
	}
	$('#alertModal').find('.modal-title').text(header);
	removeCss();
	$('#cssClass').addClass(cssClass);
    $('#alertModal').find('.modal-body p').html(message);
    $('#alertModal').modal('show');
}
var apiClientApp = angular
		.module("apiClientApp", [ 'ngResource', 'ui.bootstrap'])
		.directive(
				'loading',
				function() {
					return {
						restrict : 'E',
						replace : true,
						template : '<div class="loading"><img src="/js/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
						link : function(scope, element, attr) {
							scope.$watch('loading', function(val) {
								if (val)
									$(element).show();
								else
									$(element).hide();
							});
						}
					}
				});

apiClientApp.controller(
				'apiClientController',
				function($scope, $http, $resource) {

					$scope.isLogin = true;
					$scope.showMenu = false;
					$scope.isHome = false;
					$scope.isAuth = false;
					$scope.isSubscription = false;
					$scope.showTerminateSubscription = false;
					$scope.isResource = false;
					$scope.addRes = false;
					$scope.addSer = false;
					$scope.message = '';
					$scope.cssClass = '';
					$scope.authType = "Basic,Digest";
					$scope.operations = "Read Resource,Write Resource,Delete Resource,Execute Resource";
					$scope.type = ["Resources","Lifecycle Events"];
					$scope.events = ["Registration","Deregistration","Update","Expiration"];
					$scope.deletionPolicy = [1,0];
					$scope.error = false;
					$scope.isSerialNumGiven = false;
					$scope.loading = false;

					$scope.authDetails = {};
					$scope.subDetails = {};
					$scope.subDetails.type = "Resources";
					$scope.subDetails.deletionPolicy = 0;
					$scope.resourceRequest = {};
					$scope.deviceFaultList = {};
					$scope.listSubscription = [];
					$scope.listResource = [];
					$scope.listAuthentication = [];
					$scope.isListAuth = false;
					$scope.isListSubs = false;
					$scope.isListResource = false;
					$scope.selectEvents = false;
					$scope.serialList = [];
					$scope.selectedEvent = [];

					$scope.serialNumList = [];
					$scope.resourceSubsList = [];

					var dbSerialNumList = [];
					var dbResourceSubsList = {};
					var subMap = {};
					$scope.showSubmit = true;
					$scope.sendId = "";
					$scope.sendObjectId = "";
					
					$scope.showResourceVal = false;
					$scope.showPagination = false;
					$scope.listEPObj = {};
					$scope.listEndPointsDetails = {};
					$scope.isListEP = false;
					$scope.isEPAvailable = false;
					$scope.showEPDetails = false;
					$scope.endpoint = [];
					$scope.endpointList = [];
					$scope.gatewayList = [];
					$scope.openPopover = false;
					$scope.showSubsText = false;
					$scope.sentSubscriptionList = [];
					$scope.subscriptionId = "";
					$scope.isReportData = false;
					$scope.listReportData = [];
					$scope.reportData = {};
					$scope.resourceResList = [];
					$scope.resResp = false;
					$scope.resultResList = [];
					$scope.resultResp = false;
					$scope.responseData = {};
					$scope.isResponseData = false;
					$scope.listResponseData = [];
					$scope.loginDetails = {};
					$scope.curPage = 0;
					$scope.curSPage = 0;
					$scope.showSubSend = false;
					$scope.showAuthSend = false;
					$scope.showResSend = false;
					$scope.isLifecycleData = false;
					$scope.listLifecycleEvent = [];
					$scope.lifecycleData = {};
					$scope.authDetails.callBackUrl = "http://localhost:7001/m2m/impact/callback";
					$scope.serverUrl = "";
					$scope.isSingleEP = false;
					$scope.getSingleEndpointDetails = {};
					$scope.showAddSS = false;
					$scope.sendSerialNumList = [];
					$scope.showDelSS = false;

					var clear = function() {
						$scope.isAuth = false;
						$scope.isSubscription = false;
						$scope.showTerminateSubscription = false;
						$scope.addSer = false;
						$scope.message = '';
						$scope.showSubmit = true;
						$scope.isListAuth = false;
						$scope.isListSubs = false;
						$scope.isResource = false;
						$scope.isListResource = false;
						$scope.sendId = "";
						$scope.sendObjectId = "";
						$scope.error = false;
						$scope.authDetails = {};
						$scope.subDetails = {};
						$scope.resourceRequest = {};
						$scope.serialNumList = [];
						$scope.loading = false;
						$scope.isHome = false;
						$scope.selectedEvent = [];
						$scope.selectEvents = false;
						$scope.resourceSubsList = [];
						$scope.listSubscription = [];
						$scope.listAuthentication = [];
						$scope.listResource = [];
						$scope.showResourceVal = false;
						$scope.showPagination = false;
						$scope.listEPObj = {};
						$scope.listEndPointsDetails = {};
						$scope.isListEP = false;
						$scope.isEPAvailable = false;
						$scope.showEPDetails = false;
						$scope.endpoint = [];
						$scope.endpointList = [];
						$scope.gatewayList = [];
						$scope.openPopover = false;
						$scope.showSubsText = false;
						$scope.sentSubscriptionList = [];
						$scope.subscriptionId = "";
						$scope.isReportData = false;
						$scope.listReportData = [];
						$scope.reportData = {};
						$scope.resourceResList = [];
						$scope.resResp = false;
						$scope.resultResList = [];
						$scope.resultResp = false;
						$scope.responseData = {};
						$scope.isResponseData = false;
						
						$scope.listResponseData = [];
						dbSerialNumList = [];
						dbResourceSubsList = {};
						$scope.isLogin = false;
						$scope.showMenu = true;
						$scope.loginDetails = {};
						$scope.curPage = 0;
						$scope.showSubSend = false;
						$scope.showAuthSend = false;
						$scope.showResSend = false;
						$scope.isLifecycleData = false;
						$scope.listLifecycleEvent = [];
						$scope.lifecycleData = {};
						$scope.authDetails.callBackUrl = "http://localhost:7001/m2m/impact/callback";
						$scope.serverUrl = "";
						$scope.isSingleEP = false;
						$scope.getSingleEndpointDetails = {};
						$scope.hideSubmenu();
						$scope.showAddSS = false;
						$scope.sendSerialNumList = [];
						$scope.showDelSS = false;
					}
					
					var clearError = function() {
						$scope.error = false;
						$scope.message = "";
					}
					$scope.showHome = function() {
						clear();
						$scope.showMenu = true;
						$scope.isHome = true;
					}
					$scope.showLogin = function() {
						clear();
						$scope.showMenu = false;
						$scope.isLogin = true;
					}
					$scope.showAuth = function() {
						clear();
						$scope.isAuth = true;
					}

					$scope.showSubscription = function() {
						clear();
						$scope.isSubscription = true;
					}

					$scope.showResource = function() {
						clear();
						$scope.isResource = true;
					}
					$scope.showEPList = function() {
						clear();
						$scope.isListEP = true;
					}
					$scope.showTerminateSubs = function() {
						clear();
						$scope.showTerminateSubscription = true;
					}
					$scope.createAuth = function() {
						var auth = $resource("/auth");
						var authDataObj = {
							authId : ($scope.authDetails.authId != 0) ? $scope.authDetails.authId
									: 0,
							authName : $scope.authDetails.authName,
							msmLogin : $scope.authDetails.msmLogin,
							msmPassword : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse($scope.authDetails.msmPassword)),
							apiUsername : $scope.authDetails.apiUsername,
							apiPassword : CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse($scope.authDetails.apiPassword)),
							callBackUrl : $scope.authDetails.callBackUrl,
							authType : $scope.authDetails.authType
						};
						var authRes = $http.post('/auth', authDataObj);
						authRes
								.success(function(data, status, headers, config) {
									//$scope.message = "Authentication Saved Successfully";
									//$scope.showSubmit = false;
									setAuthenticationObj(data);
									$scope.showAuthSend = true;
									var message = 'Registration saved Successfully';
									displayMessage('msg',message);
									//$scope.cssClass = "msg";
								});
						authRes.error(function(data, status, headers, config) {
							var message = 'Failed to Save Registration';
							displayMessage('error',message);
						});
					}

					$scope.addResourceObj = function() {
						$scope.addRes = true;
						$scope.resourceSubsList.push({
							resourcePath : '',
							conditionValue : ''
						});
					}

					$scope.addSerial = function() {
						$scope.addSer = true;
						$scope.serialNumList.push({
							serialNumValue : ''
						});
					}
					$scope.createSubscription = function() {
						
						truncateResourceList();
						truncateSerialNumList();
						validateResourcePath();
						validateSerialNum();
						validateMMF();
						validateEvents();
						if ($scope.error == false) {
							clearError();
							for (var i = 0; i < $scope.resourceSubsList.length; i++) {
								if (!($scope.resourceSubsList[i].resourcePath == undefined || $scope.resourceSubsList[i].resourcePath == "")) {
									dbResourceSubsList["resourcePath" + i] = $scope.resourceSubsList[i].resourcePath;
									dbResourceSubsList["condition" + i] = ($scope.resourceSubsList[i].conditionValue == "undefined" ? ''
											: $scope.resourceSubsList[i].conditionValue);
								}
							}
							// Setting serialNumList
							for (var i = 0; i < $scope.serialNumList.length; i++) {
								if (!($scope.serialNumList[i].serialNumValue == undefined
										&& $scope.serialNumList[i].serialNumValue == "" && $scope.serialNumList[i].serialNumValue
										.trim().length == 0)) {
									dbSerialNumList[i] = $scope.serialNumList[i].serialNumValue;
								} else {
									console
											.log($scope.serialNumList[i].serialNumValue);
								}
							}

							var subscriptionDataObj = {
								subscriptionId : ($scope.subDetails.subscriptionId != 0) ? $scope.subDetails.subscriptionId : 0,
								subscriptionName : $scope.subDetails.subscriptionName,
								type : $scope.subDetails.type,
								deletionPolicy: $scope.subDetails.deletionPolicy,
								events : $scope.selectedEvent,
								make : $scope.subDetails.make,
								model : $scope.subDetails.model,
								firmwareVersion : $scope.subDetails.fwVersion,
								groupName : $scope.subDetails.groupName,
								serialNumList : dbSerialNumList,
								resourceDetails : dbResourceSubsList
							};
							var res = $http.post('/subscribe',
									subscriptionDataObj);
							res
									.success(function(data, status, headers,
											config) {
										//$scope.showSubmit = false;
										setSubscriptionObj(data);
										$scope.showSubSend = true;
										var message = 'Subscription Saved Successfully';
										displayMessage('msg',message);
									});
							res.error(function(data, status, headers, config) {
								var message = 'Failed to Save Subscription';
								displayMessage('error',message);
							});
						}

					}
		
					function setSubscriptionObj(data) {
						$scope.subDetails = {};
						$scope.subDetails.subscriptionId = data.subscriptionId;
						$scope.subDetails.subscriptionName = data.subscriptionName;
						$scope.subDetails.make = data.make;
						$scope.subDetails.model = data.model;
						$scope.subDetails.fwVersion = data.firmwareVersion;
						$scope.subDetails.groupName = data.groupName;
						$scope.subDetails.type = data.type;
						$scope.subDetails.deletionPolicy = data.deletionPolicy;
						$scope.onChangeType(data.type);
						$scope.onChangeDelPolicy(data.deletionPolicy);
						$scope.selectedEvent = data.events;
						$scope.resourceList =  data.resourceDetails;
						$scope.serialList = data.serialNumList;
						
						$scope.resourceSubsList = [];
						$scope.serialNumList = [];
						
						if($scope.serialList != null) {
							$scope.addSer = true;
							for (var i = 0; i < $scope.serialList.length; i++) {
								$scope.serialNumList.push({ 
									serialNumValue :$scope.serialList[i] 
									});
							}
						}
						if($scope.resourceList != null) {
							$scope.addRes = true;
							for(var p = 0;($scope.resourceList.hasOwnProperty(("resourcePath"+p))); p++) {
								$scope.resourceSubsList.push({
									  resourcePath : $scope.resourceList[("resourcePath"+ p)],
									  conditionValue : $scope.resourceList[("condition"+ p)]
									  }); 
							}
						}
						$scope.resourceList = [];
						$scope.subDetails.resourceSubsList = $scope.resourceSubsList;
						$scope.subDetails.serialNumList = $scope.serialNumList;
					}
					var setAuthenticationObjForList = function(data) {
						$scope.authDetails = {};
						$scope.authDetails.authId = data.authId;
						$scope.authDetails.authName = data.authName;
						$scope.authDetails.msmLogin = data.msmLogin;
						$scope.authDetails.apiUsername = data.apiUsername;
						$scope.authDetails.callBackUrl = data.callBackUrl;
						$scope.authDetails.authType = data.authType;
						$scope.authDetails.showSend = data.clientRegistered;
						$scope.authDetails.msmPassword = data.msmPassword;
						$scope.authDetails.apiPassword = data.apiPassword;
						$scope.authDetails.impactServerUrl = data.impactServerUrl;
					}
					var setAuthenticationObj = function(data) {
						$scope.authDetails = {};
						$scope.authDetails.authId = data.authId;
						$scope.authDetails.authName = data.authName;
						$scope.authDetails.msmLogin = data.msmLogin;
						$scope.authDetails.msmPassword = CryptoJS.enc.Base64.parse(data.msmPassword).toString(CryptoJS.enc.Utf8);
						$scope.authDetails.apiUsername = data.apiUsername;
						$scope.authDetails.apiPassword = CryptoJS.enc.Base64.parse(data.apiPassword).toString(CryptoJS.enc.Utf8);
						$scope.authDetails.callBackUrl = data.callBackUrl;
						$scope.authDetails.authType = data.authType;
						$scope.authDetails.showSend = data.clientRegistered;
						$scope.authDetails.impactServerUrl = data.impactServerUrl;
					}
					$scope.handleOperationChange = function(operation) {
						if("Write Resource" == operation) {
							$scope.showResourceVal = true;
						} else {
							$scope.showResourceVal = false;
						}
					}
					$scope.showAndGetAuthentication = function() {
						clear();
						$scope.isListAuth = true;
						$scope.listAuthForSending();
						$scope.showAuthData();
					}

					$scope.showAndGetSubsription = function() {
						clear();
						$scope.isListSubs = true;
						var listSub = $resource('/listSubscribe', {}, {
							get : {
								method : "GET",
								isArray : true,
								sync : true
							}
						});
						listSub.get(function(obj) {
									$scope.listSubscription = [];

									for (var j = 0; j < obj.length; j++) {
										setSubscriptionObj(obj[j]);
										$scope.listSubscription.push($scope.subDetails);
									}
								});
						$scope.showSubsData();
					}
					
					$scope.showAndGetResource = function() {
						clear();
						$scope.isListResource = true;
						var listRes = $resource('/listResource', {}, {
							get : {
								method : "GET",
								isArray : true,
								sync : true
							}
						});
						listRes.get(function(obj) {
							$scope.listResource = [];

							for (var j = 0; j < obj.length; j++) {
								setResourceObj(obj[j]);
								$scope.listResource.push($scope.resourceRequest);
							}
						});
						$scope.showResourceData();
					}
					
					$scope.sendAuthentication = function(url) {
					    if(url === undefined || url === "") {
							$scope.error = true;
							
							var message = 'Enter Impact Server URL';
							displayMessage('error',message);
						} 
						else {
							$scope.error = false;
							$scope.message = "";
							$scope.cssClass = "";
						}
					    if($scope.error == false) {
							$scope.loading = true;
	
							var sendReqObj = {
								id : $scope.sendId,
								url : url
							};
							var sendResult = $http.post('/sendAuth', sendReqObj);
							sendResult.success(function(data, status, headers,
									config) {
								$scope.showAndGetAuthentication();
								$scope.showAuthSend = false;
								var message = data.msg;
								displayMessage(data.cssClass,message);
							});
							sendResult.error(function(data, status, headers, config) {
								$scope.loading = false;
								var message = 'Failed to send Registration';
								displayMessage('error',message);
							});
					    }
					}
					$scope.setId = function(id) {
						$scope.sendId = id;
						$('#alertModal').modal('hide');

					}
					$scope.setId = function(id,url) {
						$scope.sendId = id;
						$('#alertModal').modal('hide');
						$scope.serverUrl = url;
					}
					$scope.setSendObjId = function(id) {
						if(id != null ) {
							$scope.sendObjectId = id;
						} else if(id == null) {
							if($scope.subscriptionId != "") {
								$scope.sendObjectId = id;
							}
						}
						$('#alertModal').modal('hide');
						$scope.listAuthForSending();
						$scope.showAuthData();

					}
					$scope.editAuth = function(authObj) {
						clear();
						setAuthenticationObj(authObj);
						$scope.isAuth = true;
					}
					$scope.deleteAuth = function(authId) {
						var delAuth = $resource('/deleteAuth/:authId', {
							authId : authId
						}, {
							get : {
								method : "DELETE"
							}
						});
						delAuth.get(function(result) {
							$scope.showAndGetAuthentication();
							/*$scope.message = "Authentication Deleted";
							$scope.cssClass = "msg";*/
							
							var message = 'Registration Deleted';
							/*$('#alertModal').find('.modal-title').text('Error!');
							removeCss();
							$('#cssClass').addClass("error");
						    $('#alertModal').find('.modal-body p').text(message);
						    $('#alertModal').modal('show');*/
							displayMessage('msg',message);
						});
					}
					$scope.getSentSubscription = function() {
						var getSentSubs = $http.get('/listSentSubscription');
						getSentSubs.success(function(data, status, headers,
								config) {
							setSentSubscriptionObj(data);
						    
						});
						getSentSubs.error(function(data, status, headers, config) {
						});
					}
					
					$scope.sendSubscription = function(serverUrl) {
						if($scope.sendId === undefined || $scope.sendId === "" ) {
							$scope.error = true;
							
							var message = 'Select registration details';
							displayMessage('error',message);
						    
						} else if(serverUrl === undefined || serverUrl === "") {
							$scope.error = true;
							
							var message = 'Enter Impact Server URL';
							displayMessage('error',message);
						} 
						else {
							$scope.error = false;
							$scope.message = "";
							$scope.cssClass = "";
						}
						if($scope.error == false) {
							$scope.loading = true;
							var sendReqObj = {
									id : $scope.sendObjectId,
									url : serverUrl,
									authId : $scope.sendId
									
								};
								var sendResult = $http.post('/sendSubscription', sendReqObj);
								sendResult.success(function(data, status, headers,
										config) {
									$scope.loading = false;
									$scope.showSubSend = false;
									var message = data.msg;
									displayMessage(data.cssClass,message);
								    
								});
								sendResult.error(function(data, status, headers, config) {
									$scope.loading = false;
									var message = 'Failed to send Subscription';
									displayMessage('error',message);
								});
								
						}
					}
					$scope.editSubs = function(subscriptionObj) {
						clear();
						$scope.isSubscription = true;
						var getSubscription = $resource('/listSubscribe/:subscriptionId', {subscriptionId : subscriptionObj.subscriptionId}, {
							get : {
								method : "GET",
								sync : true
							}
						});
						getSubscription.get(function(resultObj) {
							setSubscriptionObj(resultObj);
						});
					}
					$scope.deleteSubs = function(subsId) {
						var delSub = $resource('/deleteSubscription/:subId', {
							subId : subsId
						}, {
							get : {
								method : "DELETE"
							}
						});
						delSub.get(function(result) {
							$scope.showAndGetSubsription();
							/*$scope.message = "Subscription Deleted";
							$scope.cssClass = "msg";*/
							
							var message = 'Subscription Deleted';
							/*$('#alertModal').find('.modal-title').text('Success!');
							removeCss();
							$('#cssClass').addClass('msg');
						    $('#alertModal').find('.modal-body p').text(message);
						    $('#alertModal').modal('show');*/
							displayMessage('msg',message);
						    
						});
					}

					$scope.addResource = function() {
						//alert("$scope.resourceRequest.resourceId = "+$scope.resourceRequest.resourceId);
						validateResourceValue($scope.resourceRequest.resourceValue);
						if($scope.error == false) {
							var resourceDataObj = {
									resourceId : ($scope.resourceRequest.resourceId != undefined) ? ($scope.resourceRequest.resourceId) : 0,
									resourcePath : $scope.resourceRequest.resourcePath,
									operation : $scope.resourceRequest.operation,
									serialNum : $scope.resourceRequest.serialNum,
									resourceValue: ($scope.resourceRequest.resourceValue === undefined) ? "" : ($scope.resourceRequest.resourceValue)
								};
								var resourceRes = $http.post('/resource',
										resourceDataObj);
								resourceRes.success(function(data, status, headers,
										config) {
									//$scope.showSubmit = false;
									setResourceObj(data);
									$scope.showResSend = true;
									var message = 'Resource Saved Successfully';
									displayMessage('msg',message);
								});
								resourceRes.error(function(data, status, headers,
										config) {
									var message = 'Failed to Save Authentication';
									displayMessage('error',message);
								    
								});
						}
						
					}
					var setResourceObj = function(data) {
						$scope.resourceRequest = {};
						$scope.resourceRequest.resourceId = data.resourceId;
						$scope.resourceRequest.resourcePath = data.resourcePath;
						$scope.resourceRequest.operation = data.operation;
						$scope.resourceRequest.serialNum = data.serialNum;
						$scope.resourceRequest.resourceValue = data.resourceValue;
						if($scope.resourceRequest.resourceValue != "") {
							$scope.showResourceVal = true;
						}
					}


					$scope.sendResource = function(serverUrl) {
						if($scope.sendId === undefined || $scope.sendId === "" ) {
							$scope.error = true;
							
							var message = 'Select registration details';
							displayMessage('error',message);
						    
						} else if(serverUrl === undefined || serverUrl === "") {
							$scope.error = true;
							displayMessage('error',message);
						} 
						else {
							$scope.error = false;
							$scope.message = "";
							$scope.cssClass = "";
						}
						if($scope.error == false) {
							$scope.loading = true;
							var sendReqObj = {
									id : $scope.sendObjectId,
									url : serverUrl,
									authId : $scope.sendId
									
								};
								var sendResult = $http.post('/sendResource', sendReqObj);
								sendResult.success(function(data, status, headers,
										config) {
									$scope.loading = false;
									$scope.showResSend = false;
									var message = data.msg;
									displayMessage(data.cssClass,message);
								    
								});
								sendResult.error(function(data, status, headers, config) {
									$scope.loading = false;
									var message = 'Failed to send Subscription';
									displayMessage('error',message);
								});
						}
					}
					$scope.editResource = function(resourceObj) {
						clear();
						setResourceObj(resourceObj);
						$scope.isResource = true;
					}
					$scope.deleteResource = function(resourceId) {
						var delRes = $resource('/deleteResource/:resourceId', {
							resourceId : resourceId
						}, {
							get : {
								method : "DELETE"
							}
						});
						delRes.get(function(result) {
							$scope.showAndGetResource();
							
							var message = 'Resource Deleted';
							displayMessage('msg',message);
						    
						});
					}
					$scope.onChangeType = function(value) {
						if(!("Resources" === value || value === undefined || null === value)) {
							$scope.selectEvents = true;
						} else {
							$scope.selectEvents = false;
						}
					}
					$scope.onChangeDelPolicy = function(value) {
						$scope.subDetails.deletionPolicy = value;
					}
					
					function truncateResourceList () {
						for (var i = 0; i < $scope.resourceSubsList.length; i++) {
							
							if ($scope.resourceSubsList[i].resourcePath == "" && $scope.resourceSubsList[i].conditionValue == "") {
								$scope.resourceSubsList.splice(i, 1);
							}

						}
					}
					function truncateSerialNumList () {
						var len = $scope.serialNumList.length;
						var list = $scope.serialNumList;
						for (var i = 0; i < len; i++) {
							if(list[i] != undefined) {
								if (list[i].serialNumValue === "" ) {
									$scope.serialNumList.splice(i,1);
									if(list.length == 0) {
										break;
									}
								} 
							}
							
						} 
						if($scope.serialNumList.length == 1) {
							if($scope.serialNumList[0] != undefined) {
								if($scope.serialNumList[0].serialNumValue === "" ) {
									$scope.serialNumList.splice(0,1);
								}
							}
						}
					}
					var validateResourcePath = function() {
						clearError();
						if($scope.selectEvents == false) {
							if($scope.resourceSubsList.length == 0) {
								$scope.error = true;
								var message = 'Resource Path is Mandatory';
								displayMessage('error',message);
							}
						} else if($scope.selectEvents == true && ($scope.resourceSubsList.length > 0)) {
							$scope.error = true;
							var message = 'Resource is invalid for subscription type lifecycle events';
							displayMessage('error',message);
						} else {
							$scope.error = false;
						}
					}
					var validateMMF = function() {
						if (($scope.subDetails.make == undefined || $scope.subDetails.make == "")) {
							if (($scope.subDetails.model != undefined) && ($scope.subDetails.model != "")
									&& ($scope.subDetails.model != null)) {
								$scope.error = true;
								var message = 'Model cannot be given without make';
								displayMessage('error',message);
							    
							}else if(($scope.subDetails.fwVersion != undefined) && ($scope.subDetails.fwVersion != "")
									&& ($scope.subDetails.fwVersion != null)) {
								$scope.error = true;
								var message = 'Firmware Version cannot be given without make/model';
								displayMessage('error',message);
							}
						} else if(($scope.subDetails.model === undefined) || ($scope.subDetails.model === "")
								|| ($scope.subDetails.model === null)) {
							if(($scope.subDetails.fwVersion != undefined) && ($scope.subDetails.fwVersion != "") && ($scope.subDetails.fwVersion != null)) {
								$scope.error = true;
								var message = 'Firmware Version cannot be given without make/model';
								displayMessage('error',message);
							}
						}
						
						if($scope.isSerialNumGiven) {
							if(($scope.subDetails.make != undefined && $scope.subDetails.make != "") || ($scope.subDetails.model != "" &&
									$scope.subDetails.model != undefined) ||( $scope.subDetails.fwVersion != undefined 
									&& $scope.subDetails.fwVersion != "")) {
								$scope.error = true;
								
								var message = 'Serial Number cannot be used with Make, Model/ Firmware combination';
								displayMessage('error',message);
							    
							} 
						}
					}
					$scope.toggleSelection = function toggleSelection(event) {
						var idx = $scope.selectedEvent.indexOf(event);

					    // is currently selected
					    if (idx > -1) {
					      $scope.selectedEvent.splice(idx, 1);
					    } else {
					    	$scope.selectedEvent.push(event);
					    }
						
					}
					var validateSerialNum = function() {
						if($scope.serialNumList.length > 0) {
							$scope.isSerialNumGiven = true;
						} else {
							$scope.isSerialNumGiven = false;
						}
					}
					var validateResourceValue = function(resourceValue) {
						if($scope.resourceRequest.operation == 'Write Resource') {
							if(resourceValue == undefined || resourceValue == "") {
								$scope.error = true;
								var message = 'Resource Value is mandatory for write resource';
								displayMessage('error',message);
							} else {
								$scope.error = false;
							}
						}
						
					}
					var validateEvents = function() {
						if($scope.selectEvents == true) {
							if($scope.selectedEvent == null || $scope.selectedEvent.length == 0) {
								$scope.error = true;
								var message = 'At least one event is mandatory for Lifecycle Event type';
								displayMessage('error',message);
							} 
						}
					}
					$scope.showAuthData = function(){
						$scope.showPagination = true;
						 $scope.curAuthPage = 0;
						 $scope.displayCurPage = $scope.curAuthPage + 1;
						 $scope.pageSize = 5;
						 $scope.numberOfAuthPages = function() {
										return Math.ceil($scope.listAuthentication.length / $scope.pageSize);
									};
						         
						}
					
					$scope.showSubsData = function(){
						$scope.showPagination = false;
						 $scope.curSPage = 0;
						 $scope.displayCurPage = $scope.curSPage + 1;
						 $scope.pageSize = 5;
						 $scope.numberOfSubsPages = function() {
										return Math.ceil($scope.listSubscription.length / $scope.pageSize);
									};
						         
						}
					
					$scope.showResourceData = function(){
						$scope.showPagination = false;
						 $scope.curPage = 0;
						 $scope.displayCurPage = $scope.curPage + 1;
						 $scope.pageSize = 5;
						 $scope.numberOfResourcePages = function() {
										return Math.ceil($scope.listResource.length / $scope.pageSize);
									};
						         
						}
					
					$scope.showNotificationReportData = function(){
						$scope.showPagination = false;
						 $scope.curPage = 0;
						 $scope.displayCurPage = $scope.curPage + 1;
						 $scope.pageSize = 5;
						 $scope.numberOfReportPages = function() {
										return Math.ceil($scope.listReportData.length / $scope.pageSize);
									};
						         
						}
					
					$scope.showNotificationResponseData = function(){
						$scope.showPagination = false;
						 $scope.curPage = 0;
						 $scope.displayCurPage = $scope.curPage + 1;
						 $scope.pageSize = 5;
						 $scope.numberOfResponsePages = function() {
										return Math.ceil($scope.listResponseData.length / $scope.pageSize);
									};
						         
						}
					$scope.showNotificationLceData = function(){
						$scope.showPagination = false;
						 $scope.curPage = 0;
						 $scope.displayCurPage = $scope.curPage + 1;
						 $scope.pageSize = 5;
						 $scope.numberOfLifecyclePages = function() {
										return Math.ceil($scope.listLifecycleEvent.length / $scope.pageSize);
									};
						         
						}
					$scope.setListEPObj = function() {
						$scope.listAuthForSending();
						$scope.listEPObj = {
								startOffset : $scope.listEndPointsDetails.startOffset,
								endOffset : $scope.listEndPointsDetails.endOffset,
								groupName :  $scope.listEndPointsDetails.groupName
						};
						$scope.showAuthData();
					}
					
					$scope.sendSingleEPObj = function() {
						$scope.listAuthForSending();
						$scope.sendSerialNumList = [$scope.getSingleEndpointDetails.serialNum];
						$scope.showAuthData();
					}
					
					$scope.listAuthForSending = function () {
						var listAuth = $resource('/listAuthentication', {}, {
							get : {
								method : "GET",
								isArray : true,
								sync : true
							}
						});
						listAuth.get(function(obj) {
							$scope.listAuthentication = [];

							for (var j = 0; j < obj.length; j++) {
								setAuthenticationObjForList(obj[j]);
								$scope.listAuthentication
										.push($scope.authDetails);
							}
						});
					}
					
					$scope.listEndPoints = function(serverUrl) {
						if($scope.sendId === undefined || $scope.sendId === "" ) {
							$scope.error = true;
							var message = 'Select registration details';
							displayMessage('error',message);
						} else if(serverUrl === undefined || serverUrl === "") {
							$scope.error = true;
							var message = 'Enter Impact Server URL';
							displayMessage('error',message);
						} 
						else {
							$scope.error = false;
							$scope.message = "";
							$scope.cssClass = "";
						}
						if($scope.error == false) {
							$scope.loading = true;
							var sendReqObj = {
									id : $scope.sendObjectId,
									url : serverUrl,
									authId : $scope.sendId,
									listEndPoints : $scope.listEPObj
								};
								var sendResult = $http.post('/listendpoints', sendReqObj);
								sendResult.success(function(data, status, headers,
										config) {
									$scope.loading = false;
									if(data.msg == undefined || data.msg == "" || data.msg == null) {
										$scope.isEPAvailable = true;
										$scope.listEndPointsDetails.totalDevices = data.listEndPoints.totalDevices;
										$scope.setEndPointsDetails(data.listEndPoints);
										
										$scope.showSubmit = false;
									} else {
										var message = data.msg;
										displayMessage(data.cssClass,message);
									}
									
								    
								});
								sendResult.error(function(data, status, headers, config) {
									$scope.loading = false;
									var message = 'Failed to list Endpoints';
									displayMessage('error',message);
								});
								
						}
					}
					
					
					$scope.enablePopover = function() {
						$scope.openPopover = true;
						$('[data-toggle=popover]').popover({
						    content: $('#endpointDetailsTable').html(),
						    html: true
						}).click(function() {
						    $(this).popover('show');
						});
					}
					/*$scope.showDelPolicyDetails = function() {
						$('[data-toggle="tooltip"]').tooltip();
					}*/
					$scope.setEndPointsDetails = function(listEpObj) {
						for(var k = 0; k < listEpObj.directEndPoints.length; k++) {
							$scope.gatewayList.push(listEpObj.directEndPoints[k].impactGWId);
							var serialNumbers = listEpObj.directEndPoints[k].serialNumbers;
							for(var l = 0;l < serialNumbers.length; l++) {
								$scope.endpoint.push(serialNumbers[l]);
							}
							$scope.endpointList.push($scope.endpoint);
						}
						}
					
					$scope.showGatewayDetails = function() {
						$scope.showEPDetails = true;
					}
					$scope.toggleRadio = function(selected) {
						if('subs' == selected) {
							$scope.getSentSubscription();
							$scope.showSubsText = true;
							$scope.subscriptionId = "";
							$scope.sendObjectId = "";
						} else if('user' == selected) {
							$scope.showSubsText = false;
							$scope.subscriptionId = "";
							$scope.sendObjectId = "";
						}
					}
					var setSentSubscriptionObj = function(data) {
						for (var i = 0; i < data.length; i++) {
							/*$scope.sentSubscriptionList.push({ 
								subId :data[i].subscriptionId
								});*/
							$scope.sentSubscriptionList[i]=data[i].subscriptionId;
						}
					}
					$scope.setSubscriptionId = function(subscriptionId) {
						$scope.subscriptionId = subscriptionId;
					}
					$scope.sendTerminateSubscription = function(serverUrl) {
						//alert("id = " + serverUrl + "authId = "+$scope.sendId+" subscriptionId = "+$scope.sendObjectId);
						if($scope.sendId === undefined || $scope.sendId === "" ) {
							$scope.error = true;
							var message = 'Select registration details';
							displayMessage('error',message);
						    
						} else if(serverUrl === undefined || serverUrl === "") {
							$scope.error = true;
							var message = 'Enter Impact Server URL';
							displayMessage('error',message);
						} 
						else {
							$scope.error = false;
							$scope.message = "";
							$scope.cssClass = "";
						}
						if($scope.error == false) {
							$scope.loading = true;
							var sendReqObj = {
									id : $scope.sendObjectId,
									url : serverUrl,
									authId : $scope.sendId
									
								};
								var sendResult = $http.post('/sendTerminateSubscription', sendReqObj);
								sendResult.success(function(data, status, headers,
										config) {
									$scope.loading = false;
									var message = data.msg;
									displayMessage(data.cssClass,message);
								    
								});
								sendResult.error(function(data, status, headers, config) {
									$scope.loading = false;
									var message = 'Failed to terminate subscription';
									displayMessage('error',message);
								});
								
						}
					}
					
					$scope.showReportDataList = function() {
						clear();
						$scope.isReportData = true;
						
						var listReport = $resource('/m2m/impact/listReport', {}, {
							get : {
								method : "GET",
								isArray : true,
								sync : true
							}
						});
						listReport.get(function(obj) {
							$scope.listReportData = [];

							for (var j = 0; j < obj.length; j++) {
								setReportObjForList(obj[j]);
								$scope.listReportData
										.push($scope.reportData);
							}
						});
						$scope.showNotificationReportData();
					}
					var setReportObjForList = function(report) {
						$scope.reportData = {};
						$scope.reportData.serial = report.serialNumber;
						$scope.reportData.timestamp = report.timestamp;
						$scope.reportData.subscriptionId = report.subscriptionId;
						$scope.reportData.value = report.value;
					}
					
					$scope.showResponseDataList = function() {
						clear();
						$scope.isResponseData = true;
						
						var listResponse = $resource('/m2m/impact/listResponse', {}, {
							get : {
								method : "GET",
									isArray : true,
									sync : true
							}
						});
						listResponse.get(function(obj) {
							$scope.listResponseData = [];

							for (var j = 0; j < obj.length; j++) {
								$scope.setResponseObjForList(obj[j]);
								$scope.listResponseData
										.push($scope.responseData);
							}
						});
						$scope.showNotificationResponseData();
					}
					$scope.getSingleResponseObj = function(requestId, serialNum) {
						var singleResponse = $resource('/m2m/impact/listResponse/:requestId', {
							requestId : requestId+"-"+serialNum
						}, {
							get : {
								method : "GET"
							}
						});
						singleResponse.get(function(obj) {
							$scope.setResponseObjForList(obj);
								
						});
					}
					$scope.setResponseObjForList = function(response) {
						$scope.responseData = {};
						$scope.responseData.serial = response.serial;
						$scope.responseData.timestamp = response.timestamp == null ? "" :response.timestamp;
						$scope.responseData.requestId = response.requestId == null ? "" :response.requestId;
						$scope.responseData.creationDate = response.creationDate == null ? "" :response.creationDate;
						$scope.responseData.make = response.make == null ? "" :response.make;
						$scope.responseData.model = response.model == null ? "" :response.model;
						$scope.responseData.firmwareVersion = response.firmwareVersion == null ? "" :response.firmwareVersion;
						$scope.responseData.groupName = response.groupName == null ? "" :response.groupName;
						$scope.responseData.imsi = response.imsi == null ? "" :response.imsi;
						$scope.responseData.address = response.address == null ? "" :response.address;
						$scope.responseData.freeformAddress = response.freeformAddress == null ? "" :response.freeformAddress;
						$scope.responseData.protocol = response.protocol == null ? "" :response.protocol;
						
						$scope.resourceMap = response.resourceMap;
						$scope.result = response.resultMap;
						
						$scope.resourceResList = [];
						$scope.resultResList = [];
						
						if($scope.resourceMap != null) {
							for(var p = 0;($scope.resourceMap.hasOwnProperty(("resourcePath"+p))); p++) {
								$scope.resourceResList.push({
									  resourcePath : $scope.resourceMap[("resourcePath"+ p)],
									  value : $scope.resourceMap[("value"+ p)]
									  }); 
							}
						}
						
						if($scope.result != null) {
							$scope.resultResp = true;
								$scope.resultResList.push({
									  code : $scope.result[("code")],
									  reason : $scope.result[("reason")],
									  subCode : $scope.result[("subCode")]
									  }); 
						} else {
							$scope.resultResList.push({
								  code : "",
								  reason : "",
								  subCode : ""
								  }); 
						}
						$scope.responseData.resourceResList = $scope.resourceResList;
						$scope.responseData.resultResList = $scope.resultResList;
						$scope.resourceMap = [];
						$scope.result = [];
					}
					
					$scope.showLifecycleEventList = function() {
						clear();
						$scope.isLifecycleData = true;
						
						var listLce = $resource('/m2m/impact/listLifecycleEvent', {}, {
							get : {
								method : "GET",
								isArray : true,
								sync : true
							}
						});
						listLce.get(function(obj) {
							$scope.listLifecycleEvent = [];

							for (var j = 0; j < obj.length; j++) {
								$scope.setLifecycleObjForList(obj[j]);
								$scope.listLifecycleEvent
										.push($scope.lifecycleData);
							}
						});
						$scope.showNotificationLceData();
					}
					$scope.getSinglelifecycleObj = function(subs,serialNum) {
						var singleLce = $resource('/m2m/impact/listLifecycleEvent/:subs', {
							subs : subs+"-"+serialNum
						}, {
							get : {
								method : "GET"
							}
						});
						singleLce.get(function(data) {
							$scope.setLifecycleObjForList(data);
						});
					}
					$scope.setLifecycleObjForList = function(lce) {
						$scope.lifecycleData = {};
						$scope.lifecycleData.subId = lce.subscriptionId;
						$scope.lifecycleData.serial = lce.serial;
						$scope.lifecycleData.timestamp = lce.timestamp == null ? "" : lce.timestamp;
						$scope.lifecycleData.make = lce.make == null ? "" : lce.make;
						$scope.lifecycleData.model = lce.model == null ? "" : lce.model;
						$scope.lifecycleData.firmwareVersion = lce.firmwareVersion == null ? "" : lce.firmwareVersion;
						$scope.lifecycleData.groupName = lce.groupName == null ? "" : lce.groupName;
						$scope.lifecycleData.imsi = lce.imsi == null ? "" : lce.imsi;
						$scope.lifecycleData.address = lce.address == null ? "" : lce.address;
						$scope.lifecycleData.protocol = lce.protocol == null ? "" : lce.protocol;
						$scope.lifecycleData.tags = (lce.tags == null || lce.tags == "") ? "" : lce.tags;
						$scope.lifecycleData.type = lce.type;
						if("registration" == lce.type) {
							$scope.lifecycleData.showMoreOptions = true;
						} else {
							$scope.lifecycleData.showMoreOptions = false;
						}
					}
					
					$scope.showSingleEP = function() {
						clear();
						$scope.isSingleEP = true;
					}
					
					$scope.loginToAdep = function() {
						if($scope.loginDetails.username == "" || $scope.loginDetails.username == null) {
							var message = "Username is mandatory";
							displayMessage('error',message);
						} else if($scope.loginDetails.password == "" || $scope.loginDetails.password == null) {
							var message = "Password is mandatory";
							displayMessage('error',message);
						} else {
							$scope.showHome();
						}
					}
					$scope.logout = function() {
						$scope.showLogin();
					}
					$scope.hideSubmenu = function() {
						$(document).on('click',function(){
							$('.collapse').collapse('hide');
							})
					}
					$scope.showAddSerialNum = function() {
						clear();
						$scope.showAddSS = true;
						$scope.getSentSubscription();
					}
					$scope.showDelSerialNum = function() {
						clear();
						$scope.showDelSS = true;
						$scope.getSentSubscription();
					}
					
					$scope.setSerialNumtoList = function(subscriptionId) {
						truncateSerialNumList();
						validateSerialNum();
						if(subscriptionId != "" || subscriptionId != null || subscriptionId != undefined) {
							$scope.subscriptionId = subscriptionId;
						}
						if($scope.subscriptionId  == null || $scope.subscriptionId == "" || $scope.subscriptionId == undefined) {
							$scope.error = true;
							$('#sendAddSerial').modal('hide');
							var message = 'Subscription Id is mandatory';
							displayMessage('error',message);
						} 
						else if($scope.isSerialNumGiven == false) {
							$scope.error = true;
							$('#sendAddSerial').modal('hide');
							var message = 'Serial Number is mandatory';
							displayMessage('error',message);
							
						} else {
							$scope.error = false;
						}
						if($scope.error == false) {
							$('#alertModal').modal('hide');
							$scope.setSendObjId($scope.subscriptionId);
							for (var i = 0; i < $scope.serialNumList.length; i++) {
								if (!($scope.serialNumList[i].serialNumValue == undefined
										&& $scope.serialNumList[i].serialNumValue == "" && $scope.serialNumList[i].serialNumValue
										.trim().length == 0)) {
									$scope.sendSerialNumList[i] = $scope.serialNumList[i].serialNumValue;
								} 
							}
							$('#alertModal').modal('hide');
							$scope.listAuthForSending();
							$scope.showAuthData();
						}
						
					}
					$scope.sendAddDelSerialNum = function(serverUrl,type) {
						if($scope.sendId === undefined || $scope.sendId === "" ) {
							$scope.error = true;
							var message = 'Select registration details';
							displayMessage('error',message);
						} else if(serverUrl === undefined || serverUrl === "") {
							$scope.error = true;
							var message = 'Enter Impact Server URL';
							displayMessage('error',message);
						} 
						else {
							$scope.error = false;
							$scope.message = "";
							$scope.cssClass = "";
						}
						if($scope.error == false) {
							$scope.loading = true;
							var sendReqObj = {
									id : $scope.sendObjectId,
									url : serverUrl,
									authId : $scope.sendId,
									serialNum : $scope.sendSerialNumList,
									msg : type
								};
								var sendResult = $http.post('/addDelSerialNum', sendReqObj);
								sendResult.success(function(data, status, headers,
										config) {
									$scope.loading = false;
									var message = data.msg;
									displayMessage(data.cssClass,message);
								});
								sendResult.error(function(data, status, headers, config) {
									$scope.loading = false;
									var message = 'Failed to get Endpoint details';
									displayMessage('error',message);
								});
						}
					}
					$scope.GetEndPoints = function(serverUrl) {
						if($scope.sendId === undefined || $scope.sendId === "" ) {
							$scope.error = true;
							var message = 'Select registration details';
							displayMessage('error',message);
						} else if(serverUrl === undefined || serverUrl === "") {
							$scope.error = true;
							var message = 'Enter Impact Server URL';
							displayMessage('error',message);
						} 
						else {
							$scope.error = false;
							$scope.message = "";
							$scope.cssClass = "";
						}
						if($scope.error == false) {
							$scope.loading = true;
							var sendReqObj = {
									id : $scope.sendObjectId,
									url : serverUrl,
									authId : $scope.sendId,
									serialNum : $scope.sendSerialNumList
								};
								var sendResult = $http.post('/listendpoints', sendReqObj);
								sendResult.success(function(data, status, headers,
										config) {
									$scope.loading = false;
									if(data.msg == undefined || data.msg == "" || data.msg == null) {
										$scope.isEPAvailable = true;
										$scope.listEndPointsDetails.totalDevices = data.listEndPoints.totalDevices;
										$scope.setEndPointsDetails(data.listEndPoints);
										
										$scope.showSubmit = false;
									} else {
										var message = data.msg;
										displayMessage(data.cssClass,message);
									}
									
								    
								});
								sendResult.error(function(data, status, headers, config) {
									$scope.loading = false;
									var message = 'Failed to get Endpoint details';
									displayMessage('error',message);
								});
								
						}
					}
					//var _selected;

					  $scope.selected = undefined;
					  $scope.states = ['lwm2mSecurity/0/lwm2mServerURI','lwm2mSecurity/0/bootstrapServer','lwm2mSecurity/0/securityMode','lwm2mSecurity/0/publicKey','lwm2mSecurity/0/serverPublicKey','lwm2mSecurity/0/secretKey','lwm2mSecurity/0/smsSecurityMode','lwm2mSecurity/0/smsBindingKeyParameters','lwm2mSecurity/0/smsBindingSecretKeys','lwm2mSecurity/0/lwm2mServerSmsNumber','lwm2mSecurity/0/shortServerID','lwm2mSecurity/0/clientHoldOffTime','lwm2mServer/0/shortServerID','lwm2mServer/0/lifetime','lwm2mServer/0/defaultMinimumPeriod','lwm2mServer/0/defaultMaximumPeriod','lwm2mServer/0/disable','lwm2mServer/0/disableTimeout','lwm2mServer/0/notificationStoringWhenDisabled','lwm2mServer/0/binding','lwm2mServer/0/registrationUpdateTrigger','lwm2mAccessControl/0/objectID','lwm2mAccessControl/0/objectInstanceID','lwm2mAccessControl/0/acl','lwm2mAccessControl/0/accessControlOwner','device/0/manufacturer','device/0/modelNumber','device/0/serialNumber','device/0/firmwareVersion','device/0/reboot','device/0/factoryReset','device/0/availablePowerSources','device/0/powerSourceVoltage','device/0/powerSourceCurrent','device/0/batteryLevel','device/0/memoryFree','device/0/errorCode','device/0/resetErrorCode','device/0/currentTime','device/0/utcOffset','device/0/timezone','device/0/supportedBindingModes','connectivityMonitoring/0/networkBearer','connectivityMonitoring/0/availableNetworkBearer','connectivityMonitoring/0/radioSignalStrength','connectivityMonitoring/0/linkQuality','connectivityMonitoring/0/IPAddresses','connectivityMonitoring/0/routerIPAddresses','connectivityMonitoring/0/linkUtilization','connectivityMonitoring/0/APN','connectivityMonitoring/0/cellID','connectivityMonitoring/0/SMNC','connectivityMonitoring/0/SMCC','firmwareUpdate/0/Package','firmwareUpdate/0/packageURI','firmwareUpdate/0/update','firmwareUpdate/0/state','firmwareUpdate/0/updateSupportedObjects','firmwareUpdate/0/updateResult','location/0/Latitude','location/0/longitude','location/0/altitude','location/0/uncertainty','location/0/velocity','location/0/timestamp','connectivityStatistics/0/smsTxCounter','connectivityStatistics/0/smsRxCounter','connectivityStatistics/0/txData','connectivityStatistics/0/rxData','connectivityStatistics/0/maxMessageSize','connectivityStatistics/0/averageMessageSize','connectivityStatistics/0/startOrReset'];
					 

				});

angular.module('apiClientApp').filter('pagination', function()
		{
		 return function(input, start)
		 {
		  start = +start;
		  return input.slice(start);
		 };
		});
