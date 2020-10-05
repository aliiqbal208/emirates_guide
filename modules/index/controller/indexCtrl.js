(function(){

    angular.module('HomeModule',[])
.controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$rootScope', 'HomeService', '$location', 'GeneralService', '$sce', '$timeout'];

function HomeController($scope, $rootScope, HomeService, $location, GeneralService, $sce, $timeout) {
        
        var vm = this;

        function construct(){

            get_categories();
            get_videos();
            get_offers();

            $scope.config = {};
            $scope.config.sources = [];

            $scope.offers = [];

        }


        function get_offers(){
            GeneralService.GetAllOffers().then(function(data){

                if(data.status){
                    $scope.offers = data.data;
                    slide_offers();
                }

            })
        }

        function slide_offers(){ //will be converted to directive later
            $timeout(function(){;
            $(".offers_box-1").mouseover(function(){
                $(".offers_text-1").slideDown("slow");
            });
            $(".offers_box-1").mouseleave(function(){
                $(".offers_text-1").slideUp("slow");
            });

            $(".offers_box-2").mouseover(function(){
                $(".offers_text-2").slideDown("slow");
            });
            $(".offers_box-2").mouseleave(function(){
                $(".offers_text-2").slideUp("slow");
            });

            $(".offers_box-3").mouseover(function(){
                $(".offers_text-3").slideDown("slow");
            });
            $(".offers_box-3").mouseleave(function(){
                $(".offers_text-3").slideUp("slow");
            });

            $(".offers_box-4").mouseover(function(){
                $(".offers_text-4").slideDown("slow");
            });
            $(".offers_box-4").mouseleave(function(){
                $(".offers_text-4").slideUp("slow");
            });

            $(".offers_box-5").mouseover(function(){
                $(".offers_text-5").slideDown("slow");
            });
            $(".offers_box-5").mouseleave(function(){
                $(".offers_text-5").slideUp("slow");
            });

            $(".offers_box-6").mouseover(function(){
                $(".offers_text-6").slideDown("slow");
            });
            $(".offers_box-6").mouseleave(function(){
                $(".offers_text-6").slideUp("slow");
            });
}, 3000)
        }

        function get_videos(){

            GeneralService.GetAllVideos().then(function(data){

                if(data.status){
                    //$scope.videos = data.data;
                    prepare_videos(data.data);
                }

            });

        }

        function prepare_videos(videos){

            //$scope.videos

            videos.forEach(function(video){

                var type = video.video_url.substring(video.video_url.lastIndexOf(".")+1,video.video_url.length);
                $scope.config.sources.push({"src": $sce.trustAsResourceUrl(video.video_url), "type": "video/"+type});


            })

            //$scope.config.theme = "./modules/common/scripts/videogular/themes/default/videogular.css"
        }

        function get_categories(){

            //status

            HomeService.GetCategories().then(function(data){
                
                    if(data.status=="true"){
                     
                        $scope.categories = data.data;

                    }

            })
        }

        $scope.register_business = function(){

            $location.path('/packages');

        }
        construct();
};

})();