angular.module('RegisterModule',[])
.controller('RegisterController', RegisterController);
RegisterController.$inject = ['$scope', '$http', '$location', 'RegisterService', 'toastr', 'HomeService'];
function RegisterController ($scope, $http, $location, RegisterService, toastr, HomeService) {

            function construct(){

                console.log("RegisterController came up.");
                    
                    get_plans();
                    get_categories();

                    $scope.plans = [];
                    $scope.selected_plan = {};
                    $scope.new_business = {};
                    $scope.categories = [];
                    $scope.form_submitted = false;


            }

            function get_categories(){

                HomeService.GetCategories().then(function(data){

                    if(data.status=="true"){
                        $scope.categories = data.data;
                    }

                });

            }

            function get_plans(){

                RegisterService.GetPackages().then(function(data){

                if(data.status=="true"){

                    $scope.plans = data.data;

                }

                });

            }

            $scope.select_plan=function(plan, redirect){

                $scope.selected_plan = plan;

                if(redirect){
                    RegisterService.SetPlan(plan);
                    $location.path('/register');

                }
            }


            $scope.validate_package = function(){

                $scope.selected_plan = RegisterService.GetPlan();
                if(!$scope.selected_plan){

                    toastr.info("You need to select a package plan before you sign up!");
                    $location.path('/packages');
                    return;
                }

                $scope.new_business.membership_plans_id = $scope.selected_plan.id;
            }

            $scope.register_business = function(invalid, errors){
                $scope.form_submitted = true;
                if(invalid || $scope.new_business.password!=$scope.repassword) return;
                console.log($scope.new_business);
                RegisterService.SaveBusiness($scope.new_business).then(function(data){

                    toastr.info(data.message);
                    $location.path("/login");

                })

            }

            construct();
    }
