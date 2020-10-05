(function(){



	angular.module('AdminPanelModule')



	.service('AdminService', AdminService);



    AdminService.$inject = ["HttpService", "$q", "$http"];





	function AdminService(HttpService, $q, $http){



		function get_all_businesses(){



			var deffered = $q.defer();



			HttpService.Get("GetAllBusiness").then(function(data){

				deffered.resolve(data);

			}, function(err){

				deffered.reject(err);

			});



			return deffered.promise;



		}

        function update_admin_news(news) {

            var deferred = $q.defer();

            HttpService.Post("UpdateNews", news)
                .then(function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    deferred.reject(err);
                    return deferred.promise;
                })
            return deferred.promise;
        }


        function delete_admin_news(news_id) {

            var deferred = $q.defer();

            $http.delete(base_url+'DeleteNews?id='+news_id)
                .then(function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    deferred.reject(err);
                    return deferred.promise;
                });
            return deferred.promise;
        }

        function add_admin_news(obj) {
            var deferred = $q.defer();

            HttpService.Post("AddNews", obj)
                .then(function (data) {
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                    deferred.reject(err);
                    return deferred.promise;
                })
            return deferred.promise;
        }




		function get_all_news() {
            var deffered = $q.defer();



            HttpService.Get("GetAllNews").then(function(data){

                deffered.resolve(data);

            }, function(err){

                deffered.reject(err);

            });



            return deffered.promise;

        }


		return{


			GetAllBusinesses: get_all_businesses,
            GetAllNews		: get_all_news,
            UpdateAdminNews	: update_admin_news,
            DeleteAdminNews : delete_admin_news,
            AddAdminNews    : add_admin_news

		}



	}







})();