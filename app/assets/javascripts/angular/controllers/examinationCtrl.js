var schoolApp = angular.module('schoolApp');
schoolApp.controller('examinationCtrl',['$scope','Classroom','Error','$rootScope','$filter','ClassroomMainSubjects','ExaminationExamSchemas','Examination',function($scope,Classroom,Error,$rootScope,$filter,ClassroomMainSubjects,ExaminationExamSchemas,Examination){
	Examination.find({},function(data){
	Error.parse(data,function(data){
		$scope.examinations=data.examination;
	},function(data){});
	
},function(data){});
	
	
	
	$scope.addExamination=function(){
		Examination.create({},$scope.examination,function(data){
			Error.parse(data,function(data){
				
				Examination.find({},function(data){
					Error.parse(data,function(data){
						$scope.examinations=data.examination;
					    $scope.examination="";
					},function(data){});
					
				},function(data){});

			},function(data){});
		},function(data){});
	};
	
	
	
		/*
	$scope.isAddEvent=false;

	
	$scope.addEvent=function(day){
		var k = ($scope.date).getDate();
        var today = angular.copy($scope.date);
		$scope.date = today.setDate(day);
		console.log($scope.date);
		$scope.date=new Date($scope.date);
		$scope.isAddEvent=true;
	};
	$scope.saveEvent=function(subject,slot){
		subject.slot = slot;
		$scope.subjects_added.push(subject);
		$scope.subjects_available.splice($scope.subjects_available.indexOf(subject),1);
		$scope.isAddEvent=false;
		console.log($scope.subjects_available);
	};
	$scope.cancelEvent=function(){
		$scope.isAddEvent=false;
	};
	$scope.cancelExam=function(){
		$scope.subjects_available=$scope.main_subjects;
		$scope.subjects_added=new Array();
	};
	$scope.saveExam=function(data){
		var exam_schemas = new Object();
		exam_schemas.data = data;
		ExaminationExamSchemas.create({examinationId:1},exam_schemas,function(data){
        	Error.parse(data,function(data){
        		//this is the case of success
        		//here we have to do the thing in case the attendance si successfully submitted
        	},function(data){
        		//this is in case of failure
        	});
        },function(data){$scope.error=data;});
	};
	
	
	$scope.currentDate=new Date();
	$scope.date=new Date();
	$scope.$watch('date',function(){
		$scope.wday=($scope.date).getDay();
		$scope.mday=($scope.date).getMonth();
		$scope.year=($scope.date).getFullYear();
		$scope.dynamicPopoverTitle="hello";
		$scope.dynamicPopover="contents";
	    $scope.monthName = $scope.date.toLocaleString("en-us", { month: "long" });
		cal(daysInMonth($scope.mday,$scope.year),firstday($scope.mday));
		if($scope.date<$scope.currentDate)
			$scope.isClickable=false;
		else
			$scope.isClickable=true;
	});
	$scope.changeMonth=function(type){
		var m = ($scope.date).getMonth();
		today = angular.copy($scope.date);
		if(type=="previous")
		$scope.date = today.setMonth(m-1);
		else
		$scope.date = today.setMonth(m+1);
		$scope.date=new Date($scope.date);
	};
	
 var firstday=function(mday)
	{
	 	var t = new Date();
	 	t.setMonth(mday);
	    t.setDate(1);
	    return t.getDay();
	};
	var daysInMonth=function(month,year) {
		return new Date(year, month+1, 0).getDate();
	};
Classroom.all({},function(data){
		Error.parse(data,function(data){$scope.classrooms=data.classrooms;},function(data){});
	},function(data){});
	$scope.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	//$scope.main=1;
	var cal = function(days,start){
		$scope.rows = new Array();
		$scope.rows.push(new Array());
		var d = 1;
		var s = start;
		var left = 7-start;
		while(start>0){start--;var sp=" ";for(var k=start;k>=0;k--){sp=sp+" ";};$scope.rows[0].push(sp);}
		while(left>0){left--;$scope.rows[0].push(d);d++;}
		days = days-7+s;
		var c = 1;
		while(days>0){
			$scope.rows.push(new Array());
			for(var i=1;i<=7;i++){$scope.rows[c].push(d);d++;days--;if(days<=0){break;}}
			c++;
			if(days<0){break;}
		}
	};
	cal(daysInMonth($scope.mday,$scope.year),firstday($scope.mday,$scope.wday));
	
*/
}]);
