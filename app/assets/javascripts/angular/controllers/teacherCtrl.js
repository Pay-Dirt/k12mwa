var teacherCtrl = angular.module('schoolApp').controller('teacherCtrl',['$scope','$http','Teacher',function($scope,$http,Teacher){
	//$scope.loadTeachers = $http.get('teachers').success(function(data){
	//	$scope.teachers = data;
	//});
	$scope.isTeacherPresent=true;
	$scope.teachers = [];
	Teacher.list(function(data){
		$scope.teachers = data;
		//console.log(data.length);
		if(data.length>0){$scope.isTeacherPresent = true;}
		else{$scope.isTeacherPresent = false;}
		
	});
	
	//this will create a new teacher
	$scope.addTeacher = function(){
		
		Teacher.create($scope.newTeacher,function(data){
			//console.log(data);
			$scope.teachers.push(data);
			$scope.newTeacher = "";
			$scope.isTeacherPresent = true;
		});
	};
}]);

