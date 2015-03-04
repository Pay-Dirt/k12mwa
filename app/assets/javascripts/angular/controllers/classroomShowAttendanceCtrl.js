angular.module('schoolApp').controller('classroomShowAttendanceCtrl',['$scope','$rootScope','$routeParams','ClassroomSectionStudents','Error','Section','Attendance','$filter',function($scope,$rootScope,$routeParams,ClassroomSectionStudents,Error,Section,Attendance,$filter){
		$scope.classroomId=$routeParams.classroomId;
		$scope.months=[{month_number:'01',month_name:'Jan'},{month_number:'02',month_name:'Feb'},{month_number:'03',month_name:'Mar'},{month_number:'04',month_name:'Apr'},{month_number:'05',month_name:'May'},{month_number:'06',month_name:'Jun'},{month_number:'07',month_name:'Jul'},{month_number:'08',month_name:'Aug'},{month_number:'09',month_name:'Sep'},{month_number:'10',month_name:'Oct'},{month_number:'11',month_name:'Nov'},{month_number:'12',month_name:'Dec'}];
		$scope.sectionId=$routeParams.sectionId;
		
		var getYesterday = function(today){
			d = today.getDate();
			y = today.setDate(d-1);
			return y;
		};
		
		var todayDate = new Date();
		$scope.yearName = $filter('date')(todayDate, 'yyyy');
        $scope.month = $scope.yearName+'-'+$scope.dateRange;
        
        $scope.$watch('dateRange',function(){
        	$scope.month = $scope.yearName+'-'+$scope.dateRange;
        	whoseAttendanceToDisplay();
        	
        });
        
		$scope.todayDate = $filter('date')(todayDate, 'yyyy-MM-dd');
		$scope.yesterdayDate = $filter('date')(getYesterday(todayDate), 'yyyy-MM-dd');
		$scope.studentSelect="all";
		
		var classroomSectionStudent = function(){
			ClassroomSectionStudents.all({'classroomId':$routeParams.classroomId,'sectionId':$routeParams.sectionId},function(data){
				Error.parse(data,function(data){
					$scope.classroomSectionStudent = data.students;
					$scope.students_data = data.students;
					},function(data){});
				
				},function(error){$scope.error = error;});
		};
		
		classroomSectionStudent();
		
		$scope.studentSelected=function(data){
			$scope.studentSelect=data;
			console.log(data);
			whoseAttendanceToDisplay();
		};

		var whoseAttendanceToDisplay=function()
		{
			
			var qdata = {};   
			if($scope.studentSelect=="all"){
				if($scope.dateRange=="Today"){
					$scope.displayCase=3;
					qdata={keys:"section_id:classroom_id:date:attendanceOf",section_id:$routeParams.sectionId,classroom_id:$routeParams.classroomId,date:$scope.todayDate,attendanceOf:"day"};
				}
				else if($scope.dateRange=="Yesterday"){
					$scope.displayCase=3;
					qdata={keys:"section_id:classroom_id:date:attendanceOf",section_id:$routeParams.sectionId,classroom_id:$routeParams.classroomId,date:$scope.yesterdayDate,attendanceOf:"day"};
				}
				else{
					$scope.displayCase=4;
					qdata={keys:"section_id:classroom_id:month:attendanceOf",section_id:$routeParams.sectionId,classroom_id:$routeParams.classroomId,month:$scope.month,attendanceOf:"month"};
                 	}
					
			}
			else{
				if($scope.dateRange=="Today"){
					$scope.displayCase=1;
					qdata={keys:"section_id:classroom_id:date:student_id:attendanceOf",section_id:$routeParams.sectionId,classroom_id:$routeParams.classroomId,date:$scope.todayDate,student_id:$scope.studentSelect,attendanceOf:"day"};
				}
				else if($scope.dateRange=="Yesterday"){
					$scope.displayCase=1;
					qdata={keys:"section_id:classroom_id:date:student_id:attendanceOf",section_id:$routeParams.sectionId,classroom_id:$routeParams.classroomId,date:$scope.yesterdayDate,student_id:$scope.studentSelect,attendanceOf:"day"};
				}
				else{
					$scope.displayCase=2;
					qdata={keys:"section_id:classroom_id:month:student_id:attendanceOf",section_id:$routeParams.sectionId,classroom_id:$routeParams.classroomId,month:$scope.month,student_id:$scope.studentSelect,attendanceOf:"month"};
				}
				
			}
				Attendance.qfind({},qdata,function(data){
				Error.parse(data,function(data){
					//in case of success
					console.log("success");
					
					$scope.attendances_data=data.attendances;
					
				},function(data){
					//in case of unsuccessfull request
					console.log("unsuccessful");
					
				});
			},function(data){
				console.log("error");

				$scope.error=data;});
		};
		


}]);