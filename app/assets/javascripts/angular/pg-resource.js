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
				
				//function to map the qdata and urldata to url with query to be used in get methods
				function buildqUrl(urlData,qData){
					var qUrl = buildUrl(urlData);
					
					var keys = qData.keys;
					keys= keys.trim();
					
					keys = keys.split(":");
					var qString = "?";
					for(x in keys){
						if(x==0){qString = qString+ keys[x]+"=" + qData[keys[x]];}
						else{qString = qString + "&" + keys[x] +"="+ qData[keys[x]];}
					}
					//console.log(qUrl+qString);
					return qUrl+qString;
				}
				
				
			return {
				//defining http service for all
				all: function(urlData,success,error){
					$http.get(buildUrl(urlData)).success(function(data,responseHeaders){
						success(data);
					}).error(function(data){error(data);});
				},
				//this will return the data of a given id
				find: function(urlData,success,error){
					$http.get(buildUrl(urlData)).success(function(data,responseHeaders){
						success(data);
					}).error(function(data){error(data);});
				},
				//this will process the data with query string
				qfind: function(urlData,qData,success,error){
					$http.get(buildqUrl(urlData,qData)).success(function(data,responseHeaders){
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