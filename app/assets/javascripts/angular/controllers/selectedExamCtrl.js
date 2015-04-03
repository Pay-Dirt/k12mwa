var schoolApp = angular.module('schoolApp');
schoolApp.controller('selectedExamCtrl',['$scope','Classroom','Error','$rootScope','$filter','ClassroomMainSubjects','ExaminationExamSchemas','Examination','$routeParams','Notification',function($scope,Classroom,Error,$rootScope,$filter,ClassroomMainSubjects,ExaminationExamSchemas,Examination,$routeParams,Notification){
	$rootScope.main=6;
	var examSchema=new Object();
	$scope.selectDate=false;
	$scope.check =function(m,k)
	{
		console.log(m+k+"hioo");
		var a=$scope.subject;
		if(k==false)
			{
				$scope.examSchema[a].date=m;
				$scope.selectDate=false;
				
			}
	};
	$scope.baseUrl="schools/examination/"+$routeParams.examinationId;
	//this will request a new classroom data like subjects when the classroom selected changes
	$scope.$watch('classroom',function(){

		Classroom.find({},function(data){
			Error.parse(data,function(data){$scope.classrooms=data.classrooms;},function(data){});
		},function(data){});		
		if($scope.classroom!=undefined){
			$scope.classroomSelected=true;
			//$rootScope.main=6;
			$scope.classroomSelected=true;
	 		ClassroomMainSubjects.all({classroomId:$scope.classroom},function(data){
			Error.parse(data,function(data){
			$scope.main_subjects = data.main_subjects;
			$scope.exam_subjects=new Array();
			for(a in $scope.main_subjects)
				{
					for(x in $scope.main_subjects[a].sub_subjects_detail)
						{
						var examSubjects = new Object();
									examSubjects.id=$scope.main_subjects[a].sub_subjects_detail[x].id;
									examSubjects.name=$scope.main_subjects[a].sub_subjects_detail[x].name;
									examSubjects.max_marks=$scope.main_subjects[a].sub_subjects_detail[x].max_marks;
									$scope.exam_subjects.push(examSubjects);
						}
				}
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

	$scope.selectDate=function(data)
	{
		console.log(a+"huhk");
		$scope.subject=data;
		$scope.selectDate=true;
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
	

	

	
}]);