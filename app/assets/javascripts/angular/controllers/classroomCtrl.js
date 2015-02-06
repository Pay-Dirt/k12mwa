var classroomCtrl = angular.module('schoolApp').controller('classroomCtrl',['$scope','$http','Classroom','Section',function($scope,$http,Classroom,Section){
	//here we load classrooms with all the section informations
	$scope.classrooms = Classroom.fetchClassrooms(function(data,responseHeaders){
		$scope.classrooms = data;
		fetchSection();
	});
	
	//this will add a new classroom
	$scope.addClassroom = function(classroom){
		var url = "classrooms";
		var data = '{"classroom_number":"' + classroom +'"}';
		
		//this will return the classroom information along with section after it is created
		$http.post(url,data).success(function(data){
			$scope.classrooms.push(data);
			$scope.newClassroom = "";
			var sectionUrl = "classrooms/" + data.id + "/sections";
			$http.get(sectionUrl).success(function(value){
				$scope.sections.push(value[0]);
			});
		});
	};
	
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
		Section.query(function(data,responseHeaders){$scope.sections = data;});
	};
}]);