(function(){

angular.module('LoginModule',[])

.controller('LoginController', LoginController);

LoginController.$inject = ['$scope',  '$location', '$modal', 'toastr', 'LoginService'];

function LoginController ($scope, $location, $modal, toastr, LoginService) {
    
    var forgotModal = $modal({

        scope: $scope,
        animation: 'am-fade-and-scale',
        templateUrl: './common/partials/reset_password_modal.html',
        show: false

    });

    function construct(){


    }

    $scope.show_forgot_password = function(){

        forgotModal.$promise.then(forgotModal.show);

    }

    $scope.reset_password = function(email){

        forgotModal.$promise.then(forgotModal.hide);
        LoginService.ResetPassword(email).then(function(data){

            if(data.status)
            toastr.info("Please check your mailbox for your password.");
            else toastr.info("Something went wrong, please try again later.");
        });
        

    }
    $scope.attmpt_login = function(){

        LoginService.Attempt($scope.user).then(function(data){

            if(!data.status){

                toastr.info(data.message);

            }
            else{
                $scope.current_user = data.data[0];
                LoginService.Login($scope.current_user);
                $location.path("/members_area");
            }

        })

    }
    construct();    
};

})();