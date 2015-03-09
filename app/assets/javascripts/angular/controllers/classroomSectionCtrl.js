angular.module('schoolApp').controller('classroomSectionCtrl',['$scope','$rootScope','$routeParams','ClassroomSectionStudents','ClassroomSections','Teacher','Section','Error',function($scope,$rootScope,$routeParams,ClassroomSectionStudents,ClassroomSections,Teacher,Section,Error){
	$scope.classroomId=$routeParams.classroomId;
	$scope.sectionId=$routeParams.sectionId;
    $scope.buttonClass="btn btn-success";
    $scope.buttonName = "Present";
    
	$rootScope.currentUrl="schools/classroom/"+$scope.classroomId+"/section/"+$scope.sectionId;
	//get the list of all students in a particular section
	var classroomSectionStudent = function(){
		ClassroomSectionStudents.all({'classroomId':$routeParams.classroomId,'sectionId':$routeParams.sectionId},function(data){
			Error.parse(data,function(data){
				$scope.classroomSectionStudent = data.students;
				$scope.data = data.students;
			},function(data){});
			
			},function(error){$scope.error = error;});
	};
	classroomSectionStudent();
	
	var loadSection = function(){
		ClassroomSections.find({classroomId:$routeParams.classroomId,id:$routeParams.sectionId},function(data){
			Error.parse(data,function(data){
				$scope.section = data.section;
				if(!$scope.section.teacher_id){
					loadAllTeachers();
					$scope.turl = "assignteacher.html";
				}
				
				else{
					loadClassTeacher();
					$scope.turl = "showct.html";
				}
			},function(data){});
		},function(data){});
	};
	loadSection();
	var loadClassTeacher = function(){
		Teacher.find({id:$scope.section.teacher_id},function(data){
			Error.parse(data,function(data){
				$scope.classTeacher = data.teachers;
			},function(data){});
		},function(data){});
	};
	
	var loadAllTeachers = function(){
		Teacher.all({},function(data){
			Error.parse(data,function(data){
				$scope.teachers = data.teachers;
				loadFreeTeachers();
			},function(data){});
		},function(data){});
	};
	
    $scope.assignClassTeacher = function(teacher){
    	if(!teacher){alert("no teacher selected");}
    	else{
    		ClassroomSections.update({classroomId:$routeParams.classroomId,id:$routeParams.sectionId},{teacher_id:teacher.id},function(data){
    			Error.parse(data,function(data){
    				$scope.section = data.section;
    				loadClassTeacher();
    				$scope.turl = "showct.html";
    			},function(data){});
    		},function(data){});
    	}
    };
    $scope.loadUpdate = function(){
    	loadAllTeachers();
    	$scope.turl = "assignteacher.html";
    };
    
    var loadFreeTeachers = function(){
    	Section.all({},function(data,responseHeaders){
    		Error.parse(data,function(data){
    			var assignedTeachers = data.sections;
    			$scope.freeTeachers = {};
    			for(x in assignedTeachers){
    				if(assignedTeachers[x].teacher_id != null){
    					for(y in $scope.teachers){
    						if($scope.teachers[y].id==assignedTeachers[x].teacher_id){
    							$scope.teachers.splice(y,1);
    						}
    					}
    				}
    			}
    			
    		},function(data){});
    	},function(data){});
    };
    
    $scope.removeTeacher = function(){
    	
    	ClassroomSections.update({classroomId:$routeParams.classroomId,id:$routeParams.sectionId},{teacher_id:null},function(data){
			Error.parse(data,function(data){
				$scope.section = data.section;
				loadAllTeachers();
				$scope.turl = "assignteacher.html";
			},function(data){});
		},function(data){});
    };
    	
    
}]);