(function(){

	angular.module('BusinessListModule')

	.service('BusinessListService', BusinessListService);

	BusinessListService.$inject = ["HttpService", "$q"];


	function BusinessListService(HttpService, $q){

		function get_active_businesses(){

			var deffered = $q.defer();

			HttpService.Get("GetAllActiveBusiness").then(function(data){
				deffered.resolve(data);
			}, function(err){

				deffered.reject(err);

			});

			return deffered.promise;

		}

		function get_business_by_id(_id){

			var deffered = $q.defer();

			HttpService.Get("GetBusinessById?id="+_id).then(function(data){
				deffered.resolve(data);
			}, function(err){

				deffered.reject(err);

			});

			return deffered.promise;

		}

		return{


			GetAllActiveBusiness: get_active_businesses,
			GetBusinessById: get_business_by_id



		}

	}



})();