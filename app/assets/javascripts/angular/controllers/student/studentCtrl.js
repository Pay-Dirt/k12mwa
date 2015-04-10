var studentCtrl = angular.module('schoolApp').controller('studentCtrl',['$scope','$rootScope','Student','$routeParams','Error','Classroom','ClassroomCourses',function($scope,$rootScope,Student,$routeParams,Error,Classroom,ClassroomCourses){

	Classroom.all({},function(data){
		
		Error.parse(data,function(data){
			$scope.classrooms=data.classrooms;
		},function(data){});
		
	},function(errData){
		//console.log(errData);
	});
	
	var fetchCourses = function(classroom){
		ClassroomCourses.all({classroomId:classroom.id},function(data){
			Error.parse(data,function(data){
				console.log(data);
				$scope.courses = data.courses;
			},function(data){});
		},function(data){});
	};
	var fetchSection = function(course){
		//complete this
	};
	
	$scope.$watch('classroom',function(){
		if($scope.classroom!=undefined){
		fetchCourses($scope.classroom);
		}
	});

	$scope.$watch('course',function(){
		if($scope.course!=undefined){
		fetchSection($scope.classroom);
		}
	});
	


/*	$scope.bFunction = "Add";
	
	$scope.isLoadingComplete = true;
	$scope.newTeacher={};
	$scope.isTeacherPresent=true;
	$rootScope.teachers = [];
	Teacher.all({},function(data){
		//console.log(data);
		Error.parse(data,function(data){
			if(data.teachers.length==0)
				$rootScope.teachers=[];
			else
				$rootScope.teachers = data.teachers;
			
		},function(data){});
	},function(data){});
	
	
	$scope.addTeacher = function(){
		Teacher.create({},$scope.newTeacher,function(data){
			Error.parse(data,function(data){
				$rootScope.teachers.push(data);
				$scope.newTeacher = "";
			},function(data){});
		});
	};
*/	
	
	
}]);
