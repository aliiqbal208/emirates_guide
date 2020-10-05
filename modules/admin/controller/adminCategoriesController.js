(function(){



	angular.module('AdminPanelModule', [])



	.controller('adminCategoriesController', adminController);



	adminController.$inject = ["$scope", "$modal" , "LoginService", "AdminService", "toastr"];


	function adminController($scope, $modal,  LoginService, AdminService, toastr){


		function construct(){
			$scope.Businesses = [];
			$scope.News = [];
			$scope.news_obj = {};
            $scope.editAdminNews = edit_Admin_News;
            $scope.addAdminNews = add_Admin_News;
            $scope.cancel = cancle;
            $scope.addNews = add_News;
            $scope.updateNews = update_News;
            $scope.deleteAdminNews = confirm_delete_news;

			GetAllBusiness();
			GetAllNews();

		}
		



		function GetAllBusiness(){



			AdminService.GetAllBusinesses().then(function(data){

				if(data.status == true){

					$scope.Businesses = data.data;

				}

			});

		}

        function cancle() {
            $scope.isAdd = false;
            $scope.isEdit = false;
		}

        var newsDeleteModel = $modal({
            scope: $scope,
            animation: 'am-fade-and-scale',
            placement: 'center',
            template: './common/partials/admin/News/newsDeleteModel.html',
            show: false
        });

        function delete_news(id) {

            $scope.admin_news_id = id;
            if ($scope.admin_news_id) {
                newsDeleteModel.$promise.then(newsDeleteModel.show);
            }


        }

        function confirm_delete_news(id) {
            if (id) {
                AdminService.DeleteAdminNews(id).then(function (data) {
                    //getPeriods();
                    if(data.status == "Success"){
                        console.log("Call success back");
                        GetAllNews();
                    }
                });

            }
        }


        function add_News() {
            AdminService.AddAdminNews({title:$scope.news_obj.title,description:$scope.news_obj.description}).then(function (data) {
                console.log(data);
                if(data.status == "Success"){
                    GetAllNews();
                }
            });

        }

        function update_News() {
            AdminService.UpdateAdminNews($scope.news_obj).then(function (data) {
                    console.log(data);
                if(data.status == "Success"){
                    GetAllNews();
                }
            });
        }


		function GetAllNews() {
            AdminService.GetAllNews().then(function(data){

                console.log(data);
                if(data.status == true){
                    console.log(data);
                    $scope.News = data.data;

                }

            });
            console.log($scope.News);
        }

        function edit_Admin_News(news) {
		    $scope.edit_news_id = news.id;
		    console.log(news);
            $scope.isEdit = true;
            $scope.isAdd = false;
            $scope.news_obj.id = news.id;
            $scope.news_obj.title = news.title;
            $scope.news_obj.description = news.description;
            console.log(news.date.toString("YYYY-MM-DD"));
            $scope.admin_news_date = news.date.toString("DD-MMM-YYYY");
        }

        function add_Admin_News() {
            $scope.isAdd = true;
            $scope.isEdit = false;
            $scope.news_obj.id = null;
            $scope.news_obj.title = null;
            $scope.news_obj.description = null;
        }



		$scope.set_area_progress = function(progress_flag){



			$scope.area_progress = progress_flag;



		}



		construct();

	}}());





