(function(){

	angular.module('MembersAreaModule')

	.service('MembersAreaService', MembersAreaService);

	MembersAreaService.$inject = ["HttpService", "$q", "$http"];


	function MembersAreaService(HttpService, $q, $http){

		function get_active_businesses_categories(){

			var deffered = $q.defer();

			HttpService.Get("GetAllActiveBusinessCategories").then(function(data){
				deffered.resolve(data);
			}, function(err){

				deffered.reject(err);

			});

			return deffered.promise;

		}

		function submit_company_info(company_info){

			var deffered = $q.defer();

			HttpService.Post("SubmitCompanyInformation", company_info).then(function(data){
				deffered.resolve(data);
			}, function(err){

				deffered.reject(err);

			});

			return deffered.promise;

		}

		function submit_service_info(service_obj){


			var url = base_url + 'submitServicesInformation';

			var deffered = $q.defer();

			var fd = new FormData();

			for(key in service_obj){

				fd.append(key, service_obj[key]);

			}

			$http({
    			method: 'POST',
    			url: url,
    			headers: {'Content-Type': undefined},
    			data: fd
				}).then(function(data){
					deffered.resolve(data);
				}, function(err){

					deffered.reject(err);

				});	

				return deffered.promise;

		}

		function submit_about(about_obj){

			var deffered = $q.defer();

			HttpService.Post("submitAboutInformation", about_obj).then(function(data){

				deffered.resolve(data);

			}, function(err){

				deffered.reject(err);

			});

			return deffered.promise;

		}

		function submit_brands(brands){

			//submitBrandsInformation

			var deffered = $q.defer();


			$http({

				"method": "POST",
				"url": base_url+"submitBrandsInformation",
				"headers": {'Content-Type': undefined},
				data: brands

			}).then(function(data){

				deffered.resolve(data);

			}, function(err){

				deffered.reject(err);

			});

			// HttpService.Post("submitBrandsInformation",fd, {'Content-Type': undefined}).then(function(data){

			// 	deffered.resolve(data);

			// }, function(err){


			// 	deffered.reject(err);

			// });

			return deffered.promise;
		}

		function submit_location(obj){

			var deffered = $q.defer();

			HttpService.Post("submitLocationInformation", obj).then(function(data){

				deffered.resolve(data);

			}, function(data){

				deffered.reject(data);

			});


			return deffered.promise;

		}

		return{


			GetAllCategories: get_active_businesses_categories,
			SubmitCompanyInformation: submit_company_info,
			SubmitServicesInformation: submit_service_info,
			SubmitAboutInformation: submit_about,
			SubmitBrandsInformation: submit_brands,
			SubmitLocationInformation: submit_location


		}

	}



})();