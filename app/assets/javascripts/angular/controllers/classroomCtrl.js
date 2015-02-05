var classroomCtrl = angular.module('schoolApp').controller('classroomCtrl',['$scope','$http','Classroom','Section',function($scope,$http,Classroom,Section){
	$scope.classrooms = Classroom.fetchClassrooms(function(data,responseHeaders){
		$scope.classrooms = data;
		fetchSection();
		
	});
	
	//this function will increment section
	$scope.addSection = function(classroom){
		var url = "classrooms/"+classroom+"/sections";
		$http.post(url).success(function(data){
			$scope.sections.push(data);
		});
	};
	
	//this function will remove last section added
	$scope.removeSection = function(classroom){
		var url = "classrooms/"+classroom+"/sections/1";
		$http.delete(url).success(function(data){
			//this will remove the section from the model of angular
			$scope.sections.splice($scope.sections.indexOf(data),1);
		});
	};
	
	//this function will fetch 
	var fetchSection = function(){
		Section.query(function(data,responseHeaders){$scope.sections = data;});
	};
}]);