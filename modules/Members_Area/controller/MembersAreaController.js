(function(){

	angular.module('MembersAreaModule', [])

	.controller('MembersAreaController', MembersAreaController);

	MembersAreaController.$inject = ["$scope", "LoginService", "MembersAreaService", "toastr"];

	function MembersAreaController($scope, LoginService, MembersAreaService, toastr){

		function construct(){
			
			limitations = {"BRANDS_MAX":5};

			$scope.set_area_progress(1);

			$scope.new_member = {}; //screen1

			$scope.user = get_current_user();

			prepare_json(1);

			GetAllCategories();

			$scope.categories = [];

			$scope.services_info = {}; //screen2

			$scope.about_info = {}; //screen3

			$scope.brands_array = [{"brand_name_1":"","brand_name_image_1":""}]; //screen4

			$scope.latlng = [25.2048,55.2708]; //screen5

		}


  			$scope.getpos = function(event){
     		

     		$scope.latlng = [event.latLng.lat(), event.latLng.lng()];
  			

  			}

		$scope.set_brand_photos = function(files, index){

			$scope.brands_array[index]["brand_name_image_"+(index+1)] = files[0];

			$scope.brands_array[index]["image"] = files[0];
		}

		$scope.add_more_row = function(){

			var len = $scope.brands_array.length;

			if(len>=limitations.BRANDS_MAX){
				toastr.info("You cannot add anymore brand.");
				return;
			}

			else{

				

				$scope.brands_array.push({});				

			}


		}

		function GetAllCategories(){

			MembersAreaService.GetAllCategories().then(function(data){

				if(data.status=="true"){

					$scope.categories = data.data;

				}

			});	

		}


		$scope.save_progress = function(stage_id){

			if(stage_id==1){
				//working_hours_weekends

				if(!$scope.company_information.working_hours_weekends){

					$scope.company_information.working_hours_weekends = "Weekend OFF";

				}
				$scope.company_information.registered_business_id = "2";
				MembersAreaService.SubmitCompanyInformation($scope.company_information).then(function(data){

					if(data.status){
						toastr.info(data.message);
					}
					else{
						toastr.info("Something went wrong, please retry later.");
					}


				});
			}

			else if(stage_id == 2){

				$scope.services_info.registered_business_id = $scope.user.id;

				MembersAreaService.SubmitServicesInformation($scope.services_info).then(function(data){

					if(data.data.status){
						toastr.info(data.data.message);
					}

				},
				function(err){
						toastr.info("Something went wrong, please retry later.");
					

				});

			}

			else if(stage_id == 3){

				$scope.about_info.registered_business_id = $scope.user.id;

				MembersAreaService.SubmitAboutInformation($scope.about_info).then(function(data){

					if(data.status){
						toastr.info(data.message);
					}

					else toastr.info("Something went wrong");
				});

			}
			
			else if(stage_id == 4){

				//var brand_obj = {};

				var fd = new FormData();
				$scope.brands_array.forEach(function(brand){
						
					//if(brand.image) delete brand.image;

					for(key in brand){
						//brand_obj[key] = brand[key];
						var data = brand[key];

						if(key!="$$hashKey" || key!="image")
							fd.append(key, data);
					}

				});		

				fd.append("registered_business_id", $scope.user.id);
				//brands_info.registered_business_id = $scope.user.id;

				MembersAreaService.SubmitBrandsInformation(fd).then(function(data){

					if(data.data.status){

						toastr.info(data.data.message);

					}

				}, function(err){

					toastr.info("Something went wrong, please retry later.");

				});

			}

			if(stage_id == 5){

				//$scope.latlng;
				var location_obj = {"latitude": $scope.latlng[0], "longitude": $scope.latlng[1], "registered_business_id": $scope.user.id};

				MembersAreaService.SubmitLocationInformation(location_obj).then(function(data){

					toastr.info("Location saved successfully.");

				}, function(err){

					toastr.info("Something went wrong, please retry later.");

				})


			}

		}

		$scope.set_service_photos = function(files, index){

			debugger;

			if(index==0)
			$scope.services_info.service_image_1 = files[0];

			else if(index==1)
			$scope.services_info.service_image_2 = files[0];

			files = [];

		}

		$scope.move_next = function(target_stage){

			if(target_stage==2){

				$scope.set_area_progress(2);

				$scope.save_progress(1);




			}

			else if(target_stage == 4){
				$scope.set_area_progress(5);

				$scope.save_progress(4);
			}

			else if(target_stage == 3){
				$scope.set_area_progress(3);

				$scope.save_progress(2);
			}

			else if(target_stage == 5){
				$scope.set_area_progress(5);

				$scope.save_progress(2);
			}

		}

		function get_current_user(){

			return LoginService.GetCurrentUser();

		}

		function prepare_json(stage_id){

			if(stage_id==1){

				var temp_obj = angular.copy($scope.user);

				temp_obj.phone = temp_obj.contact_no;

				temp_obj.company_manger = temp_obj.manager_name;
				
				temp_obj.registered_business_id = temp_obj.id;
				

				delete temp_obj.contact_no;
				delete temp_obj.manager_name;
				delete temp_obj.id;

				$scope.company_information = temp_obj;



			}

		}

		$scope.set_area_progress = function(progress_flag){

			$scope.area_progress = progress_flag;

		}

		construct();
	}

})();