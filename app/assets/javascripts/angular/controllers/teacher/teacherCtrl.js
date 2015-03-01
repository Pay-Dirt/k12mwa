var teacherCtrl = angular.module('schoolApp').controller('teacherCtrl',['$scope','$rootScope','Teacher','$routeParams','Error',function($scope,$rootScope,Teacher,$routeParams,Error){
	
	$scope.bFunction = "Add";
	$scope.nameDisabled = false;
	$scope.fathers_nameDisabled = false;
	$scope.contactDisabled = false;
	$scope.isLoadingComplete = true;
	$scope.newTeacher={};
	$scope.isTeacherPresent=true;
	$rootScope.teachers = [];
	Teacher.all({},function(data){
		//console.log(data);
		Error.parse(data,function(data){
			$rootScope.teachers = data.teachers;
		},function(data){});
		//if(data.length>0){$scope.isTeacherPresent = true;}
		//else{$scope.isTeacherPresent = false;}
	},function(data){});
	
	
	//this will create a new teacher
	$scope.addTeacher = function(){
		//console.log($scope.newTeacher);
		Teacher.create({},$scope.newTeacher,function(data){
			Error.parse(data,function(data){
				$rootScope.teachers.push(data);
				$scope.newTeacher = "";
				
			},function(data){});
			//$scope.isLoadingComplete = false;
			//window.history.back();
		});
	};
	
	
	/*
	 * 
	$scope.teacherId = $routeParams.teacherId;
    Teacher.find({'id':$scope.teacherId},{},function(data){
    	$scope.teacher = data;
    },function(data){});
    */
}]);
