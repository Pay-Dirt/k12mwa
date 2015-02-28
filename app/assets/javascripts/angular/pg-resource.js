//created by Akash
var resourceServices = angular.module('pg-resource',[]);
resourceServices.factory('Resource',['$http',function($http){
	
	return{
			create: function(url){
				//break the url in array at every /(backlash)
				var finalUrlC = url.trim();
				var resturl = (url.trim()).split("/");
				var urlValue = [];
				for(partialUrl in resturl){
					if(resturl[partialUrl].search(":")!=-1){
						urlValue.push(resturl[partialUrl].replace(":",""));
					}
				}
				
				//function to map the data to url
				function buildUrl(data){
					var finalUrl = finalUrlC;
					for(k in urlValue){
						if(data[urlValue[k]]){
							var d = (":"+urlValue[k]).trim();
							finalUrl= finalUrl.replace(d,data[urlValue[k]]);
						}
					}
					finalUrl= finalUrl.replace(":id","");
					return finalUrl;
				}
				
			return {
				//defining http service for all
				all: function(urlData,success,error){
					$http.get(buildUrl(urlData)).success(function(data,responseHeaders){
						success(data);
					}).error(function(data){error(data);});
				},
				//this will return the data of a given id
				find: function(urlData,data,success,error){
					$http.get(buildUrl(urlData),data).success(function(data,responseHeaders){
						success(data);
					}).error(function(data){error(data);});
				},
				//this will update the data of resource with given id
				update: function(urlData,data,success,error){
					$http.patch(buildUrl(urlData),data).success(function(data,responseHeaders){
						success(data);
					}).error(function(data){error(data);});
				},
				//this will create the classroom
				create: function(urlData,data,success,error){
					$http.post(buildUrl(urlData),data)
					.success(function(data,responseHeaders){success(data);})
					.error(function(data){error(data);});
				},
				destroy: function(urlData,success,error){
					$http.delete(buildUrl(urlData))
					.success(function(data,responseHeaders){success(data);})
					.error(function(data,responseHeaders){});
				}
			};
		}
		};
	
}]);