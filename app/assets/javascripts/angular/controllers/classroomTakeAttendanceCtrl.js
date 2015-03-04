angular.module('schoolApp').controller('classroomTakeAttendanceCtrl',['$scope','$rootScope','$routeParams','ClassroomSectionStudents','Error','Section','Attendance','$filter','$location',function($scope,$rootScope,$routeParams,ClassroomSectionStudents,Error,Section,Attendance,$filter,$location){
	$scope.classroomId=$routeParams.classroomId;
	$scope.sectionId=$routeParams.sectionId;
	$scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
	console.log("hi"+$scope.date);
	$scope.saveStatus="Save";
	$scope.dynamic=0;
	var classroomSectionStudent = function(){
		ClassroomSectionStudents.all({'classroomId':$routeParams.classroomId,'sectionId':$routeParams.sectionId},function(data){
			Error.parse(data,function(data){
				$scope.classroomSectionStudent = data.students;
				$scope.data = data.students;
				$scope.max=data.students.length;
				$scope.markAllPresent();
				$scope.markAllAbsent();
			},function(data){});
			
			},function(error){$scope.error = error;});
	};
	classroomSectionStudent();

    $scope.toggleAttendance = function(eachStudent) {

    	eachStudent.attendance = eachStudent.attendance === "Present" ? "Absent":"Present";
    };
	$scope.markAllAbsent = function(){
		for(x in $scope.data){
			$scope.data[x].attendance="Absent";
		}
	};
	

	$scope.markAllPresent = function(){
		for(x in $scope.data){
			$scope.data[x].attendance="Present";
			
		}
	};
	$scope.save = function(){
		$scope.saveStatus="Saving";
		$scope.isSaveDisabled=true;
		$scope.isProgressBarActive=true;
		for(x in $scope.data)
			{
		       		var data = $scope.data[x];
		       		data.student_id = $scope.data[x].id;
		       		data.classroom_id = $routeParams.classroomId;
		       		data.date = $scope.date;
					Attendance.create({},data,function(data){
		        	Error.parse(data,function(data){
		        		//this is the case of success
		        		//here we have to do the thing in case the attendance si successfully submitted
		        		$scope.dynamic++;
		        	},function(data){
		        		//this is in case of failure
		        	});
		        },function(data){$scope.error=data;});	
			}
		$location.path('schools/classroom/'+$scope.classroomId+'/section/'+$scope.sectionId+'/classroomShowAttendance');
		
	};
	$scope.cancel = function(){
		
		
	};

	
}]);
