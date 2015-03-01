//created by Akash
var errorServices = angular.module('errorServices',[]);

errorServices.factory('Error',['$location','Notification','UserSessionData',function($location,Notification,UserSessionData){
	return {
		parse: function(data,success,error){
			var originalData = data.data;
			var errorData = data.success;
			console.log(data);
			//here implement methods to show or delete error
				if(errorData.display=="yes"){
					switch(errorData.type){
					case "success":
						Notification.success({message:errorData.message,delay:2000});
						break;
					case "error":
						Notification.error({message:errorData.message,delay:4000});
						break;
					case "warning":
						Notification.warning({message:errorData.message,delay:3000});
						break;
					case "authFail":
						Notification.warning({message:"You are being redirected to login page",delay:1000});
						setTimeout(function(){
							UserSessionData.user = {};
							$location.path('/login');
							},1000); 
						break;
					case "invalidAccess":
						Notification.warning({message:"You are not authorise for this task.",delay:1000});
						$location.path('/invalidAccess');
						break;
					}
				}
			if(errorData.success=="yes")
				success(originalData);
			else
				error(errorData);
			}
	};
}]);