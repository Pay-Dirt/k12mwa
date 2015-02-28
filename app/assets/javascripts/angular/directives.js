var directive = angular.module('direct',[]);

directive.directive('teacher',function(){
	return{
			restrict: 'E',
			scope: {
				teacher:'=teacher'
				},
			templateUrl: 'test_directive.html',
			controller: 'teacherCtrl'
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
		controller:function($scope,$location,$rootScope,$http,Classroom,Section,ClassroomSections,DefaultClassrooms,$modal){
			
			$scope.sections = $rootScope.sections;
			
			$scope.open = function(size,classroom){
				$scope.classroomToDelete=classroom;
				  var modalInstance = $modal.open({
					  templateUrl: 'classroom_delete.html',
				      controller: 'classroomModalInstanceCtrl',
				      size: size,
				      resolve: {
				          classroomToDelete: function () {
				            return $scope.classroomToDelete;
				          }}
				  	});
				  };
				
				 //this will delete classroom alongwith its sections
				$scope.deleteClassroom = function(classroom){
					Classroom.destroy({id:classroom.id},
							function(data){
						$rootScope.classrooms.splice($rootScope.classrooms.indexOf(classroom),1);
					});
				};

				//this function will increment section
				$scope.addSection = function(classroom){
					ClassroomSections.create({classroomId:classroom},{},
							function(data){
								console.log(data);
								if(data.success == "no"){alert(data.error);}
								else{$rootScope.sections.push(data);}
							});
				};
				
				//this function will remove last section added
				$scope.removeSection = function(classroom){
					
					
					
					ClassroomSections.destroy({classroomId:classroom.id,id:1},function(data){
						//function to provide index of data from sections
						var getIndex = function(from,data){
							for(x in from){
								if(from[x].id == data.id){return x;}
							}
						};
						if(data.success == "no"){
							alert("Can't delete");}
						else{
							$rootScope.sections.splice(getIndex($rootScope.sections,data),1);
						}
					});
				};
				//this provides a link to enter a particular section of classroom
				$scope.moveToSection = function(classroom,section){
					$rootScope.main=1;
					console.log(classroom.id,section.id);
					$scope.classroomId=classroom.id;
					$scope.sectionId = section.id;
					
					$location.path('/classroom/'+$scope.classroomId+'/section/'+$scope.sectionId);
				};
				
		}
		
	};
});
