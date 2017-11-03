/* angular
		.module('salesApp', [ 'ngRoute', 'auth', 'home', 'message', 'navigation' ])
		.config(

				function($routeProvider, $httpProvider, $locationProvider) {

					$locationProvider.html5Mode(true);

					$routeProvider.when('/', {
						templateUrl : '../html/Home.html',
						controller : 'home',
						controllerAs : 'controller'
					}).when('/showEnquiry', {
						templateUrl : '../html/Enquiry.html',
						controller : 'addDetailsQuotation',
						controllerAs : 'controller'
					}).when('/showQuotation', {
						templateUrl : '../html/Quotation.html',
						controller : 'addDetailsEnquiry',
						controllerAs : 'controller'
					}).otherwise('/');

					$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

				}).run(function(auth) {

			// Initialize auth module with the home page and login/logout path
			// respectively
			auth.init('/', '/login', '/logout');

		});


*/


	var obj = angular.module("salesApp", ["ngRoute"]);
			obj.config(function($routeProvider){
			$routeProvider
			.when("/", {
						templateUrl:"Home.html"
					})
			.when("/changePass", {
						templateUrl:"ChangePass.html"
					})
			.when("/showUser", {
						templateUrl:"User.html"
					})
			.when("/showlogin", {
						templateUrl:"Login.html"
					})
			.when("/showEnquiry", {
						templateUrl:"Enquiry.html"
					})		
			.when("/showQuotation", {
						templateUrl:"../html/Quotation.html"
					})
			.when("/showPurchaseOrder", {
						templateUrl:"../html/PurchaseOrder.html"
					})
			.when("/showIDC", {
						templateUrl:"../html/InwardDC.html"
					})
			.when("/showItemMaster", {
						templateUrl:"../html/ItemMaster.html"
					})
			.when("/showVendors", {
						templateUrl:"../html/Vendor.html"
					})
			.when("/showInvoice", {
						templateUrl:"../html/Invoice.html"
					})
			.when("/showCusEnquiry", {
						templateUrl:"../html/CustomEnquiry.html"
					})
			.when("/showGenQuotation", {
						templateUrl:"../html/GenerateQuotation.html"
					})
			.when("/showSalesPurchaseOrder", {
						templateUrl:"../html/SalesPurchaseOrder.html"
					})
			.when("/showDC", {
						templateUrl:"../html/DeliveryChallan.html"
					})		
			.when("/a", {
						templateUrl:"../html/.html"
					})
			.when("/d", {
						templateUrl:"../html/.html"
					})
			.when("/showReceivable", {
						templateUrl:"../html/Receivable.html"
					})
			.when("/showPayable", {
						templateUrl:"../html/Payable.html"
					})	
			.when("/showBank", {
						templateUrl:"Bank.html"
					})
			.when("/showCash", {
						templateUrl:"../html/Cash.html"
					})
			.when("/showExpenses", {
						templateUrl:"../html/Expenses.html"
					})
			.when("/showamc", {
						templateUrl:"../html/amc.html"
					})
			.when("/showProject", {
						templateUrl:"../html/Project.html"
					})
			.when("/d", {
						templateUrl:"../html/.html"
					})
			.when("/d", {
						templateUrl:"../html/.html"
					})
			
			});
	//
	
/*	
	//var  qobj= angular.module('salesApp');
        obj.controller('quoteCtrl', function ($scope) {
            // init showForm to false;
				$scope.showForm = false;

				// init empty user object for our form
				$scope.itemId = {};
				$scope.itemName={};
				$scope.itemDesc={};

				$scope.submitForm = function() {
				  // logic when the form is submitted
				  //...

				  // reset the user
				  $scope.itemId = {};

				  // finally hide the form
				  $scope.showForm = false;
					};
            }
        });
		
		var  qobj= angular.module('salesApp');
		qobj.controller('quoteCtrl', function($scope){
			$scope.addQuote=false;
			$scope.addQuotation = function(){
				$scope.addQuote=true;
			};
			
		});*/
		
		obj.controller('homeController', function($scope){
			// $scope.isQuotation=true;
			
		});