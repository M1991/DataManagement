     // var itemId = document.getElementById("itemId").value;
	  // document.getElementById.("dispdiv").innerHTML=itemId;
	  
	  // var qprice;
	  // var disc;
	  // var dqprice;
	// function qtupcalc(){
		
		// var quantity = document.getElementById("quantity").value;
		// var uprice = document.getElementById("uprice").value;
		
		// qprice=quantity*uprice;
		// document.getElementById("tot").innerHTML=qprice;
	// }
	
	// function disccalc(){
		
		// var discount = document.getElementById("discount").value;
		//  //  //qprice=quantity*uprice;
		// disc=discount/100;
		// dqprice=qprice*disc;
	// }
	
	
	var app = angular.module('plunker', []);

    app.controller('MainCtrl', function($scope) {

      $scope.items = [];
		var qprice;
		var disc;
		var dqprice;
		var fdqprice;
		var tottax;
		var totaftax=0;
      $scope.add = function(itemToAdd) {
		$scope.$apply();
        var index = $scope.itemsToAdd.indexOf(itemToAdd);

        $scope.itemsToAdd.splice(index, 1);

        $scope.items.push(angular.copy(itemToAdd))
      }

      
	  $scope.qtupcalc = function(){
		var quantity = document.getElementById("quantity").value;
		var uprice = document.getElementById("uprice").value;
		
		qprice=quantity*uprice;
		document.getElementById("tot").innerHTML=qprice;
	  }
	  
	  
	  $scope.disccalc = function(){
		var discount = document.getElementById("discount").value;
		// qprice=quantity*uprice;
		if(discount===0){
			fdqprice=dqprice;
		}else{
			disc=discount/100;
			dqprice=qprice*disc;
			fdqprice=qprice-dqprice;
		}
		
		document.getElementById("disctot").innerHTML=fdqprice; 
	  }
	  
	  $scope.taxcalc = function(tax){
		  
		// var taxc = document.getElementById("tax").value;
		console.log($scope.quotn.tax);
		var taxc = $scope.quotn.tax;
		console.log(taxc);
		// qprice=quantity*uprice;
		tottax=(taxc/100)*fdqprice;
		totaftax=fdqprice+tottax;
		document.getElementById("sumtot").innerHTML=totaftax; 
		// document.getElementById("testform").amoun=totaftax; 
		// document.forms.testform.amoun=totaftax; 
		document.forms["testform"].elements["amoun"].innerHTML=totaftax; 
		// $scope.quotn.amount.push(totaftax);
	  }
	  // $scope.consoleform = function(quotn){
		
	  // }
    });
	
	