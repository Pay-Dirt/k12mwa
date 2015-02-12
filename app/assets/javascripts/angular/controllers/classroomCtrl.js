var classroomCtrl = angular.module('schoolApp').controller('classroomCtrl',['$scope','$http','Classroom','Section',function($scope,$http,Classroom,Section){
	//fetch list of default classrooms in $scope.defaultClassrooms
	//fetch list of default classrooms
	var defaultClassroomLoad = function(){
		$http.get("/default_classrooms").success(function(data){
			$scope.defaultClassrooms = data.default_classrooms;
		});
	};
	defaultClassroomLoad();
	
	//here we load classrooms with all the section informations
	$scope.classrooms = Classroom.fetchClassrooms(function(data,responseHeaders){
		$scope.classrooms = data.classrooms;
		fetchSection();
	});
	
	//this will add a new classroom
	$scope.addClassroom = function(classroomId){
		var url = "classrooms";
		var data = '{"default_classroom_id":"' + classroomId +'"}';
		
		//this will return the classroom information along with section after it is created
		$http.post(url,data).success(function(data){
			if(data.success == "no"){
				alert("Can't create classroom");
				$scope.newClassroom = "";
			}
			else{
			$scope.classrooms.push(data);
			$scope.newClassroom = "";
			//console.log(data);
			var sectionUrl = "classrooms/" + data.id + "/sections";
			$http.get(sectionUrl).success(function(value){
				if(!$scope.sections)
				{$scope.sections = value;}
				else
				{$scope.sections.push(value[0]);}
			});}
		});
	};
	
	//this will delete classroom alongwith its sections
	$scope.deleteClassroom = function(classroom){
		Classroom.delete({classroomId: classroom.id},
				function(data,responseHeaders){
			$scope.classrooms.splice($scope.classrooms.indexOf(classroom),1);
		});
	};
	
	//this function will increment section
	$scope.addSection = function(classroom){
		var url = "classrooms/"+classroom+"/sections";
		$http.post(url).success(function(data){
			if(data.success == "no"){alert(data.error);}
			else{$scope.sections.push(data);}
		});
	};
	
	//this function will remove last section added
	$scope.removeSection = function(classroom){
		var url = "classrooms/"+classroom+"/sections/1";
		$http.delete(url).success(function(data){
			//this will remove the section from the model of angular
			//console.log(data.success);
			if(data.success == "no"){
				alert("Can't delete");}
			else{
				$scope.sections.splice($scope.sections.indexOf(data),1);
			}
		});
	};
	
	//this function will fetch 
	var fetchSection = function(){
		Section.fetchAllSection(function(data,responseHeaders){$scope.sections = data.sections;});
	};
	
	//function declared here
	
	
}]);