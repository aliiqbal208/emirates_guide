(function(){

	angular.module('BusinessListModule', [])

	.controller('BusinessListController', BusinessListController);

	BusinessListController.$inject = ["$scope", "BusinessListService", "MembersAreaService", "$routeParams", "$location", "$sce"];

	function BusinessListController($scope, BusinessListService, MembersAreaService, $routeParams, $location, $sce){

		function construct(){

			$scope.set_list_view(1);
			get_Businesses();
			$scope.active_businesses = [];
			GetCategories();
			$scope.categories = [];


			if($routeParams.business_id){
				get_business_by_id($routeParams.business_id);
			}
		}

		$scope.get_trusted_src = function(src){

			debugger;
			return $sce.trustAsResourceUrl(img_url+src);
		}

		function get_business_by_id(id){

			BusinessListService.GetBusinessById(id).then(function(data){

				if(data.status){


					$scope.current_business = data.data[0];

				}

			}, function(err){})

		}

		function GetCategories(){

			MembersAreaService.GetAllCategories().then(function(data){

				if(data.status=="true")
				$scope.categories = data.data;

			});

		}

		function get_Businesses(){

			BusinessListService.GetAllActiveBusiness().then(function(data){

				if(data.status){

					$scope.active_businesses = data.data;

				}

			});

		}

		$scope.filter_item = function(index){
			if(!$scope.filter_character) $scope.filter_character = {};
			$scope.filter_character.character = $scope.indexChar(index);
			$scope.filter_character.index = index;
		}

		$scope.clear_character = function(){

			delete $scope.filter_character;

		}

		$scope.indexChar = function(index) {
    	
    	return String.fromCharCode(65 + index);
		
		}

		$scope.get_array = function(number){

			return new Array(number);

		}

		$scope.set_list_view = function(view_id){

			$scope.filter_character = {};

			$scope.view_type = view_id;

		}

		$scope.show_directory = function(business){



			//$location.path("/members_area", {$routeParams.category_id:business.id});

		}

		construct();
	}

})();