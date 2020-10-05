(function(){


	angular.module('RegisterModule')
.service('RegisterService', RegisterService);

RegisterService.$inject = ['HttpService', '$q'];

function RegisterService(HttpService, $q){

	this.selected_package = {};
	function _GetPackages(){

			var deffered = $q.defer();
			HttpService.Get('GetAllMemberShipPlans').then(function(data){
				deffered.resolve(data);
			},function(data){deffered.reject(data);});

			return deffered.promise;


	}

	function _setPackage(plan){

			this.selected_package = plan;
	}

	function _getPackage(){

			return this.selected_package;
	}

	function save_new_business(business_obj){

		var deffered = $q.defer();

		HttpService.Post("RegisterBusiness", business_obj).then(function(data){
			deffered.resolve(data);
		}, function(data){deffered.reject(data);});

		return deffered.promise;


	}

return{
	GetPackages: _GetPackages,
	SetPlan: _setPackage,
	GetPlan: _getPackage,
	SaveBusiness: save_new_business

}		


}

})();