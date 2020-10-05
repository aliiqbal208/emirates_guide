(function(){


	angular.module('HomeModule')
.service('HomeService', HomeService);

HomeService.$inject = ['HttpService', '$q'];

function HomeService(HttpService, $q){

	function _GetCategories(){

			var deffered = $q.defer();
			HttpService.Get('GetAllActiveBusinessCategories').then(function(data){
				deffered.resolve(data);
			},function(data){deffered.reject(data);});

			return deffered.promise;


	}

return{
	GetCategories: _GetCategories

}		


}

})();