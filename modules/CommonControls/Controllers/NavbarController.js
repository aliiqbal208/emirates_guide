angular.module('NavbarModule',[])
.controller('NavbarController', NavbarController);
NavbarController.$inject = ['$scope'];
function NavbarController ($scope) {

            function construct(){

                console.log("NavbarController came up.");

            }

            

            construct();
    }
