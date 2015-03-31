var schoolApp = angular.module('schoolApp');
schoolApp.controller('selectedExamCtrl',['$scope','Classroom','Error','$rootScope','$filter','ClassroomMainSubjects','ExaminationExamSchemas','Examination','$routeParams',function($scope,Classroom,Error,$rootScope,$filter,ClassroomMainSubjects,ExaminationExamSchemas,Examination,$routeParams){
	
	$scope.check =function(m,k)
	{
		console.log("hi"+m+k);
	};
	$scope.baseUrl="#/schools/examination/"+$routeParams.examinationId;
	//this will request a new classroom data like subjects when the classroom selected changes
	$scope.$watch('classroom',function(){
		ClassroomMainSubjects.all({classroomId:$scope.classroom},function(data){
			
			Error.parse(data,function(data){$scope.mainsubjects=data;console.log(data);},function(data){});
		},function(data){});
		Classroom.find({},function(data){
			Error.parse(data,function(data){$scope.classrooms=data.classrooms;},function(data){});
		},function(data){});		
		if($scope.classroom!=undefined){
			$scope.classroomSelected=true;
			$rootScope.main=6;$scope.classroomSelected=true;
     		ClassroomMainSubjects.all({classroomId:$scope.classroom},function(data){
			Error.parse(data,function(data){
			$scope.main_subjects = data.main_subjects;
			//$scope.subjects_available=data.main_subjects;
			//$scope.subjects_added=new Array();
			},function(data){});
		},function(data){
			
		});
		qdata={keys:"classroom_id",classroom_id:$scope.classroom};		
		ExaminationExamSchemas.qfind({examinationId:$routeParams.examinationId},qdata,function(data){
        	Error.parse(data,function(data){
        		$scope.exam_schemas=data.exam_schema;
        		if($scope.exam_schemas.length){//this is the case when exam has already been added
        			$scope.subjects_available=new Object();
        			$scope.subjects_added=$scope.exam_schemas;
        		}
        		else{//case when no exam added
        			$scope.subjects_available=$scope.main_subjects;
        			$scope.subjects_added=new Object;
        		}
        		var map=new Object();
        		for(a in $scope.main_subjects)
					{console.log(a);
					   map[$scope.main_subjects[a].id]=$scope.main_subjects[a].name;
					   
					}
				for(e in $scope.exam_schemas){
					$scope.exam_schemas[e].subject_name = map[$scope.exam_schemas[e].main_subject_id];
				}
				
				//this is the case of success

        	},function(data){
        		//this is in case of failure
        	});
        },function(data){$scope.error=data;});
		}
	});

	$scope.isAddEvent=false;
	$scope.durations = [90,120,150,180];
	
	$scope.addEvent=function(day){
		var k = ($scope.date).getDate();
        var today = angular.copy($scope.date);
		$scope.date = today.setDate(day);
		$scope.date=new Date($scope.date);
		if($scope.classroomSelected){
		$scope.isAddEvent=true;}
	};
	$scope.saveEvent=function(subject){
		$scope.subjects_added.push(subject);
		for(subject in $scope.subjects_added)
        	{
        		$scope.subjects_added[subject].date=$scope.date;
        		$scope.subjects_added[subject].classroom_id=$scope.classroom;
        		$scope.subjects_added[subject].examination_id=$routeParams.examinationId;
        		$scope.subjects_available.splice($scope.subjects_available[subject],1);
        	}
		$scope.isAddEvent=false;
	};
	$scope.cancelEvent=function(){
		$scope.isAddEvent=false;
	};
	$scope.cancelExam=function(){
		$scope.subjects_available=$scope.main_subjects;
		$scope.subjects_added=new Object;
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
	

	
//this part controls the calendar which should not be altered	
/*	$scope.currentDate=new Date();
	$scope.date=new Date();
	$scope.$watch('date',function(){
		$scope.wday=($scope.date).getDay();
		$scope.mday=($scope.date).getMonth();
		$scope.year=($scope.date).getFullYear();
	    $scope.monthName = $scope.date.toLocaleString("en-us", { month: "long" });
		cal(daysInMonth($scope.mday,$scope.year),firstday($scope.mday));
	});
	$scope.changeMonth=function(type){
		var m = ($scope.date).getMonth();
		today = angular.copy($scope.date);
		if(type=="previous"&&today.getMonth!=$scope.startingmonth)
		$scope.date = today.setMonth(m-1);
		else if(type=="next" &&today.getMonth!=$scope.startingmonth-1)
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
	};*/
	
Classroom.all({},function(data){
	Error.parse(data,function(data){$scope.classrooms=data.classrooms;},function(data){});
	},function(data){});
	/*$scope.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
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