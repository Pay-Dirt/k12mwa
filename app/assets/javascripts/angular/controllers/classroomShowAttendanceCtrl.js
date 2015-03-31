angular.module('schoolApp').controller('classroomShowAttendanceCtrl',['$scope','$rootScope','$routeParams','ClassroomSectionStudents','Error','Section','Attendance','$filter',function($scope,$rootScope,$routeParams,ClassroomSectionStudents,Error,Section,Attendance,$filter){
		$scope.classroomId=$routeParams.classroomId;
		$scope.months=[{month_number:'01',month_name:'Jan'},{month_number:'02',month_name:'Feb'},{month_number:'03',month_name:'Mar'},{month_number:'04',month_name:'Apr'},{month_number:'05',month_name:'May'},{month_number:'06',month_name:'Jun'},{month_number:'07',month_name:'Jul'},{month_number:'08',month_name:'Aug'},{month_number:'09',month_name:'Sep'},{month_number:'10',month_name:'Oct'},{month_number:'11',month_name:'Nov'},{month_number:'12',month_name:'Dec'}];
		$scope.sectionId=$routeParams.sectionId;
      //$scope.attendanceData={attendance:'Present'},{attendance:'Absent'};
		$scope.dateRange = "Today";
		$scope.isEditAttendance=false;
		var getYesterday = function(today){
			d = today.getDate();
			y = today.setDate(d-1);
			return y;
		};
		
		
		
		
		$scope.isEditActive=new Array();
		$scope.isEditAttendance=new Array();
		$scope.changeEditState = function(data,attendance){
			$scope.isEditActive[attendance] = data;
		};
		$scope.editAttendance = function(attendance)
		{
			$scope.isEditAttendance[attendance]=true;
			$scope.isEditActive[attendance]=false;
		};
		$scope.saveAttendance = function(attendanceSelected,originalAttendanceData){//this takes 2 parameters first is the changed attendance and second is the original attendance from where we would take id and date
			console.log("hi"+attendanceSelected+"hry"+originalAttendanceData.id);
			Attendance.update({id:originalAttendanceData.id},{attendance:attendanceSelected},function(data){
				Error.parse(data,function(data){
					whoseAttendanceToDisplay();	
				},function(data){
					
				});
			},function(data){});
			$scope.isEditAttendance[originalAttendanceData.id]=false;
			$scope.isEditActive[originalAttendanceData.id]=false;
			
		};
		$scope.cancelAttendance = function(data){
			$scope.isEditAttendance[data]=false;
			$scope.isEditActive[data]=false;
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
					//console.log("success");
					
					$scope.attendances_data=data.attendances;
					if($scope.displayCase==4){
					var result = groupBy($scope.attendances_data, function(item)
							{
							  return [item.student_id];
							});
					$scope.monthly_attendance=result;
					//console.log(result);
					var i,j,attendancePercent;
					var no_of_students = result.length;
					var no_of_days = result[0].length;
					var perAtt = [];
					//console.log(no_of_students+"he"+no_of_days);
					for(i=0;i<no_of_students;i++)
						{var present=0;
							for(j=0;j<no_of_days;j++)
								{
									if(result[i][j].attendance=="Present")
										{present++;}
								}
							attendancePercent=(present*100/no_of_days);
							var thisAtt = {};
							thisAtt.student_info = result[i][0];
							thisAtt.dailyAtt = result[i];
							thisAtt.attendancePercentage = attendancePercent;
							thisAtt.student_id = result[i][0].student_id;
							perAtt.push(thisAtt);
							$scope.monthly_attendance=perAtt;
							//console.log("hi"+attendancePercent);
						}
					console.log(perAtt);
					}
				},function(data){
					//in case of unsuccessfull request
					console.log("unsuccessful");
					
				});
			},function(data){
				console.log("error");

				$scope.error=data;});
		};
		
//group
		function groupBy( array , f )
		{
		  var groups = {};
		  array.forEach( function( o )
		  {
		    var group = JSON.stringify( f(o) );
		    groups[group] = groups[group] || [];
		    groups[group].push( o );  
		  });
		  return Object.keys(groups).map( function( group )
		  {
		    return groups[group]; 
		  });
		}
		
		$scope.$watch('displayCase',function(){console.log($scope.displayCase);});
}]);