var teacherCtrl = angular.module('schoolApp').controller('teacherCtrl',['$scope','$http','Teacher','$routeParams',function($scope,$http,Teacher,$routeParams){
	//$scope.loadTeachers = $http.get('teachers').success(function(data){
	//	$scope.teachers = data;
	//});
	
	$scope.bFunction = "Add";
	$scope.nameDisabled = false;
	$scope.fathers_nameDisabled = false;
	$scope.contactDisabled = false;
	$scope.isLoadingComplete = true;
	$scope.newTeacher={};
	$scope.isTeacherPresent=true;
	$scope.teachers = [];
	Teacher.all({},function(data){
		$scope.teachers = data;
		if(data.length>0){$scope.isTeacherPresent = true;}
		else{$scope.isTeacherPresent = false;}
	});
	
	//this will create a new teacher
	$scope.addTeacher = function(){
		//console.log($scope.newTeacher);
		Teacher.create({},$scope.newTeacher,function(data){

			if(data.success){alert("unable to create");
			//$scope.isLoadingComplete = false;
			}
			else{
			//$scope.isLoadingComplete = false;	
			$scope.teachers.push(data);
			$scope.newTeacher = "";
			}
			//console.log("request complete");
			$scope.isLoadingComplete = false;
			window.history.back();
		});
	};
	
	
	
	$scope.teacherId = $routeParams.teacherId;
    Teacher.find({'id':$scope.teacherId},{},function(data){
    	$scope.teacher = data;
    });
}]);
