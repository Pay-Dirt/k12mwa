angular.module('schoolApp').controller('classroomAttendanceCtrl',['$scope','$rootScope','$routeParams','ClassroomSectionStudents','Error','Section','Attendance',function($scope,$rootScope,$routeParams,ClassroomSectionStudents,Error,Section,Attendance){
	$scope.classroomId=$routeParams.classroomId;
	$scope.sectionId=$routeParams.sectionId;
	$scope.date = new Date();
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
		       	var data = '{"student_id":"' + $scope.data[x].id +'"section_id":"' + $scope.data[x].section_id +'"attendance":"'+$scope.data[x].attendance+'"date":"'+$scope.date +'"}';
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
		
	};
	$scope.cancel = function(){
		
		
	};
}]);
