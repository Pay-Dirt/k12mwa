var directive = angular.module('direct',[]).directive('teacher',function(){
	return{
			restrict: 'E',
			scope: {
				teacher:'=teacher'
				},
			templateUrl: 'teacher_directive.html',
			
	controller: function($scope,Teacher){
			var teacher = $scope.teacher;
		Teacher.find({'id':teacher},{},function(data){$scope.tosh = data;console.log(data);
	});
	 }
		};
});
var module = angular.module('direct');
module.directive('teacherData',function(){
	return{
		restrict :'E',
		scope: {
			teacher:'=teacher'
		},
		templateUrl:'teacher_directive.html',
		controller: function($scope,Teacher,$modal){
			$scope.open = function (size,teacher) {
				$scope.teacherToDelete=teacher;
				  var modalInstance = $modal.open({
					  templateUrl: 'teacher_delete.html',
				      controller: 'ModalInstanceCtrl',
				      size: size,
				      resolve: {
				          teacherToDelete: function () {
				            return $scope.teacherToDelete;
				          }}
				  	});
				  };
			var teacher = $scope.teacher;
	 }
		};
});

module.directive('classroomData',function(){
	return {
		restrict:'E',
		scope: {
			classroom:'=classroom'
		},
		templateUrl:'classroom_directive.html',
		controller:function($scope,$http,Classroom,Section,ClassroomSections,DefaultClassrooms){
			var classroom= $scope.classroom;
			
			
			
			
			
			

				//fetch list of default classrooms in $scope.defaultClassrooms
				//fetch list of default classrooms
				var defaultClassroomLoad = function(){
					DefaultClassrooms.all({},function(data){$scope.defaultClassrooms = data;});
				};
				defaultClassroomLoad();
				$scope.classrooms = [];$scope.sections = [];
				//here we load classrooms with all the section informations
				Classroom.all({},function(data,responseHeaders){
					if(data.classrooms == "none"){}
					else{
						$scope.classrooms = data;
						fetchSection();
					}
				},function(errData){
					console.log(errData);
				});
				
				//this will add a new classroom
				$scope.addClassroom = function(classroomId){
					var data = '{"default_classroom_id":"' + classroomId +'"}';
					//this will return the classroom information along with section after it is created
					Classroom.create({},data,
							function(data){
						if(data.success == "no"){
							alert("Can't create classroom");
							$scope.newClassroom = "";
						}
						else{
						$scope.classrooms.push(data);
						//console.log($scope.classrooms);
						$scope.newClassroom = "";
						ClassroomSections.find({classroomId:data.id},{},function(data){
							$scope.sections.push(data[0]);
						});
						}
				});
				};
				
				//this will delete classroom alongwith its sections
				$scope.deleteClassroom = function(classroom){
					Classroom.destroy({id:classroom.id},
							function(data){
						$scope.classrooms.splice($scope.classrooms.indexOf(classroom),1);
					});
				};
				
				//this function will increment section
				$scope.addSection = function(classroom){
					ClassroomSections.create({classroomId:classroom},{},
							function(data){
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
					Section.all({},function(data,responseHeaders){$scope.sections = data;});
				};
				
				//faltu function declared here
				
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
		
	};
});
