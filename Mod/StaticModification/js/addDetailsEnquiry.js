// ENQUIRY CONTROLLER


obj.controller("enqCtrls", function($scope){
	$scope.showChoiceLabel=false;
	$scope.topHeader=false;
	$scope.topDetail=false;
	$scope.enquiryList=[];
	$scope.enqRef=[
		{ref:"Reference 1"},
		{ref:"Reference 2"},
		{ref:"Reference 3"}
	];
	$scope.taxes=[
		{tax:"14.2%"},
		{tax:"5.2"}
	];
	$scope.addNewChoice = function(showAddChoice){
		$scope.showChoiceLabel=true;
		$scope.topHeader=true;
		$scope.topDetail=true;
		var newItemNo = $scope.enquiryList.length+1;
		console.log(newItemNo);
		$scope.enquiryList.push({
			itemId: '',
			itemName:'',
			UOM:0,
			quantity:0,
			unitPrice: 0,
			discount:0,
			tax:'',
			amount:0,
			
		});
		console.log($scope.enquiryList);
		
	};
	$scope.removeNewChoice = function (index){
		newItemNo = $scope.enquiryList.length -1;
		$scope.enquiryList.splice(index,1);
	/*	newItemNo = $scope.enquiryList.length-1;
		console.log(newItemNo);
		
		$scope.enquiryList.pop();
		*/
		if(newItemNo==0)
		{
			//$scope.showChoiceLabel=false;
			$scope.topHeader=false;
			$scope.topDetail=false;
		}
		console.log($scope.enquiryList);
	};
	
	$scope.saveEnquiry  = function (enqfdata){
		//alert("Save Function");
		console.log($scope.enqfdata);
		console.log($scope.enquiryList);
		console.log($scope.enquiryList.unitPrice);
	};
});




//		USER ADD, DELETE, MODIFY
//
obj.controller("userCtrl", function($scope){
	$scope.showUserPanel=false;
	$scope.Users=[];
	
	$scope.addUser = function(userAdd){
		$scope.showUserPanel=true;
		var newUserData = $scope.Users.length+1;
		console.log(newUserData);
		$scope.Users.push({
			slno:'' + newUserData,
			userid:'' + newUserData,
			userpass:0 ,
			
		});
		
		//return addUser(newUserData);  auto-calculate sl.no from server return 
	};
	$scope.removeUser = function (userRemove){
		newUserData = $scope.Users.length-1;
		console.log(newUserData);
		if(newUserData >= 0){
		$scope.Users.pop();
		/*
		$scope.Users.pop({
			slno:0,
			userid:'',
			userpass:0 ,
			
		});*/
		}
	};
});


function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="inline";
	
 var vname=document.getElementById("vname_row"+no);
 var vid=document.getElementById("vid_row"+no);
 var mob=document.getElementById("vmob_row"+no);
 var vemail=document.getElementById("vemail_row"+no);
//	
 var vid_data=vid.innerHTML;
 var vname_data=vname.innerHTML;
 var vmob_data=mob.innerHTML;
 var vemail_data=vemail.innerHTML;
	
 vname.innerHTML="<input type='text' id='vname_text"+no+"' value='"+vname_data+"' style='width:60%'>";
 vid.innerHTML="<input type='text' id='vid_text"+no+"' value='"+vid_data+"' style='width:70%'>";
 mob.innerHTML="<input type='text' id='vmob_text"+no+"' value='"+vmob_data+"' style='width:60%'>";
 vemail.innerHTML="<input type='text' id='vemail_text"+no+"' value='"+vemail_data+"' style='width:60%'>";
}

function save_row(no)
{
 var vid_val=document.getElementById("vid_text"+no).value;
 var vname_val=document.getElementById("vname_text"+no).value;
 var vmob_val=document.getElementById("vmob_text"+no).value;
 var vemail_val=document.getElementById("vemail_text"+no).value;

 document.getElementById("vid_row"+no).innerHTML=vid_val;
 document.getElementById("vname_row"+no).innerHTML=vname_val;
 document.getElementById("vmob_row"+no).innerHTML=vmob_val;
 document.getElementById("vemail_row"+no).innerHTML=vemail_val;
//
 document.getElementById("edit_button"+no).style.display="inline";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
 var vid=document.getElementById("vid").value;
 var vname=document.getElementById("vname").value;
 var vmob=document.getElementById("vmob").value;
 var vemail=document.getElementById("vemail").value;
	
 var table=document.getElementById("data_table");
 var table_len=(table.rows.length)-1;
 
 
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='vname_row"+table_len+"'>"+vid+"</td><td id='vid_row"+table_len+"'>"+vname+"</td><td id='vmob_row"+table_len+"'>"+vmob+"</td><td id='vemail_row"+table_len+"'>"+vemail+"</td><td  style='width:150px'><button type='submit' id='edit_button"+table_len+"' onclick='edit_row("+table_len+")'><span class='glyphicon glyphicon-pencil'></span></button><button type='submit' id='save_button"+table_len+"' onclick='save_row("+table_len+")'><span class='glyphicon glyphicon-floppy-disk'></span></button><button type='submit' id='save_button"+table_len+"' onclick='delete_row("+table_len+")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";

 document.getElementById("vid").value="";
 document.getElementById("vname").value="";
 document.getElementById("vmob").value="";
 document.getElementById("vemail").value="";
}

/*
	obj.controller("enqCtrl", function($scope) {
	   $scope.showChoiceLabel=false;
	   //$scope.newItemNo=1;
	   $scope.length=0;
	   $scope.quotationList = [{}];
	   
	   $scope.addNewChoice = function() {
		   $scope.showChoiceLabel=true;
		 var newItemNo = $scope.quotationList.length+1;
		 $scope.quotationList.push({'id' : '' + newItemNo, 'name' : '' + newItemNo, 'uom':''+ newItemNo, 'qty' :'' + newItemNo});
	   };
	   
	   $scope.removeNewChoice = function() {
		 var newItemNo = $scope.quotationList.length-1;
		 if ( newItemNo >= 0 ) {
		  $scope.quotationList.pop();
		 }
	   };
	   
	   $scope.showAddChoice = function(choice) {	   
		 return choice.id === $scope.quotationList[$scope.quotationList.length-1].id;
		};
	   
	 });
*/