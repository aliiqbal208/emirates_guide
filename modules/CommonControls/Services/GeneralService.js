(function(){

	angular.module('GeneralModule', [])

	.service('GeneralService', GeneralService);

	GeneralService.$inject = ['$q', 'HttpService'];

	function GeneralService($q, HttpService){


		function _GetAllVideos(){

			var deffered = $q.defer();

			HttpService.Get("GetAllVideos").then(function(data){

				deffered.resolve(data);

			}, function(err){

				deffered.resolve(err);

			});

			return deffered.promise;
		}

		function _GetAllOffers(){

			var deffered = $q.defer();

			HttpService.Get("GetAllOffers").then(function(data){

				deffered.resolve(data);

			}, function(err){

				deffered.resolve(err);

			});

			return deffered.promise;
		}

		return{

			GetAllVideos: _GetAllVideos,
			GetAllOffers:_GetAllOffers

		}

	}



})();