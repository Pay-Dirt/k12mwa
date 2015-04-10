var schoolApp = angular.module('schoolApp');
schoolApp.controller('selectedExamCtrl',
		['$scope',
		 'Classroom',
		 'Error',
		 '$rootScope',
		 '$filter',
		 'ClassroomMainSubjects',
		 'ExaminationExamSchemas',
		 'ExaminationSlots',
		 'Examination',
		 '$routeParams',
		 'Notification',
		 function($scope,
				 Classroom,
				 Error,
				 $rootScope,
				 $filter,
				 ClassroomMainSubjects,
				 ExaminationExamSchemas,
				 ExaminationSlots,
				 Examination,
				 $routeParams,
				 Notification){
	$rootScope.main=6;
	
	$scope.check =function(m,k)
	{
		if(k==true)
			{
			Notification.error({message:"Choose different date",delay:4000});
			}
		else if(k==false)
		{
	 		$scope.showCalendar=false;
			$scope.exam_subjects[$scope.dateIndex].exam_date=m.toString().substring(0,15);
		}
	};
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
									examSubjects.sub_subject_id=$scope.main_subjects[a].sub_subjects_detail[x].id;
									examSubjects.name=$scope.main_subjects[a].sub_subjects_detail[x].name;
									examSubjects.max_marks=$scope.main_subjects[a].sub_subjects_detail[x].max_marks;
									examSubjects.main_subject_id=$scope.main_subjects[a].sub_subjects_detail[x].main_subject_id;
									$scope.exam_subjects.push(examSubjects);
						}
				}
			},function(data){});
		},function(data){
			
		});
	 	$scope.selectDate=function(a,index){
	 		$scope.dateIndex = index;
	 		$scope.showCalendar=true;
	 	};
	 	$scope.examinationId=$routeParams.examinationId;
		qdata={keys:"classroom_id",classroom_id:$scope.classroom};		
		ExaminationExamSchemas.qfind({examinationId:$routeParams.examinationId},qdata,function(data){
        	Error.parse(data,function(data){
        		$scope.exam_schemas=data.exam_schema;
        		slot_map();
        		
        	},function(data){
        	});
        },function(data){$scope.error=data;});
		}
	});


	$scope.slotName=new Array();
	var slot_map =function(){
		for(x in $scope.slots){
			$scope.slotName[$scope.slots[x].id] = $scope.slots[x];
		}
	};
	//javascript mapping
	//array=json.map(function(item){return item.id});
	$scope.saveExam=function(){
		//console.log($scope.exam_subjects);
		var data = new Object();
		data.data = angular.copy($scope.exam_subjects);
		data.classroom_id = $scope.classroom;
		ExaminationExamSchemas.create({examinationId:$routeParams.examinationId},data,function(data){
        	Error.parse(data,function(data){
        		
        	},function(data){
        	});
        },function(data){$scope.error=data;});
	};
	
	//slot code start here
	
	
	$scope.loadSlots = function(){
		ExaminationSlots.all({examinationId:$routeParams.examinationId},function(data){
			Error.parse(data,function(data){
				$scope.slots = data.slots;
			},function(data){});
		},function(data){});
	};
	$scope.load_slot_add_form = function(){
		$scope.slot_template = 'add_slot_form.html';
	};
	$scope.close_slot_add_form = function(){
		newSlot = null;
		$scope.slot_template = "show_slots.html";
	};
	$scope.submit_slot_form = function(slot){
		ExaminationSlots.create({examinationId:$routeParams.examinationId},slot,function(data){
			Error.parse(data,function(data){
				$scope.slots.push(data.slot);
				$scope.close_slot_add_form();
			},function(data){});
		},function(data){});
	};
	$scope.loadSlots();
	$scope.slot_template = "show_slots.html";
	//slot code end here
	//edit code starts here
	$scope.isEditActive=new Array();
	$scope.isEnableEdit=new Array();
	$scope.editControl=function(x,id){
		if(x=='true'){
			console.log(id);
			$scope.isEditActive[id]=true;
		}
		else if(x=='false'){
			$scope.isEditActive[id]=false;
		}
	};
	$scope.enableEdit=function(id,index){
		$scope.isEnableEdit[id]=true;
		$scope.isEditActive[id]=false;
		$scope.editExamSchema=angular.copy($scope.exam_schemas[index]);
	};
	//edit code ends here
}]);
