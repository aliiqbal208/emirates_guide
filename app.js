angular.module("egApp", [

    "ngRoute",

    "HomeModule",

    "LoginModule",

    "RegisterModule",

    "HttpServiceModule",

    'toastr',

    'NavbarModule',

    'ngAnimate',

    'mgcrea.ngStrap',

    'BusinessListModule',

    'angularUtils.directives.dirPagination',

    'MembersAreaModule',

    'AdminPanelModule',

    'ngFileUpload',

    'ngMap',

    'GeneralModule',

    'ngSanitize',

    'com.2fdevs.videogular',

    "com.2fdevs.videogular.plugins.controls",

    "com.2fdevs.videogular.plugins.overlayplay",

    "com.2fdevs.videogular.plugins.poster"

    ])



.config(function($routeProvider, $httpProvider) {

    

  $httpProvider.defaults.headers.common = {};

  $httpProvider.defaults.headers.post = {};

  $httpProvider.defaults.headers.get = {};

  $httpProvider.defaults.headers.put = {};

  $httpProvider.defaults.headers.patch = {};



    $routeProvider //$location

        .when("/", {

            templateUrl: './modules/index/view/index.html',

            controller: 'HomeController'

        })

        .when("/packages", {

            templateUrl: './modules/packages/view/packages.html',

            controller: 'RegisterController'

        })

        .when("/register", {

            templateUrl: './modules/register/view/register.html',

            controller: 'RegisterController'

        })

        .when("/login", {

            templateUrl: './modules/login/view/login.html',

            controller: 'LoginController'

        })

        .when("/business_list", {

            templateUrl: './modules/Business_List/view/business_list_home.html',

            controller: 'BusinessListController'

        })

        .when("/members_area", {

            templateUrl: './modules/Members_Area/view/members_area_home.html',

            controller: 'MembersAreaController'

        })

        .when("/business_list/:business_id", {

            templateUrl: './modules/Business_List/view/business_list_category_home.html',

            controller: 'BusinessListController'

        })
        .when("/admin", {

            templateUrl: 'modules/admin/view/adminCategories.html',

            controller: 'adminCategoriesController'

        })

        .otherwise({

            redirectTo: '/'

        });

})

.service('_', function(){



    return window._;

}).filter('startswith', function(){



    return function(items, char){



        if(!char) return items;



        var arr = [];

        items.forEach(function(item){



            if(item.company_name.toLowerCase().indexOf(char.toLowerCase())===0){

                arr.push(item);

            }



        })



        return arr;

    }



}).directive('myMap', function($timeout,$interpolate) {





            var link = function(scope, element, attrs) {

       //     scope.$watch('active_businesses', function(newVal, oldVal){



                console.log("I came in here");

                scope: {

                    activeBusinesses: "="

                }

               // scope.addresses = scope.active_businesses;

               scope.active_businesses=JSON.parse($interpolate(attrs.activeBusinesses)(scope));

                var map, infoWindow;

                var markers = [];



                // map config

                var mapOptions = {

                    center: new google.maps.LatLng(25.2048,55.2708),

                    zoom: 9,

                    mapTypeId: google.maps.MapTypeId.ROADMAP,

                    scrollwheel: true

                };



                // init the map

                function initMap() {



                    if (map === void 0) {

                        map = new google.maps.Map(element[0], mapOptions);

                    }

                }



                // place a marker

                function setMarker(map, lat, long, title) {



                    //geocoder = new google.maps.Geocoder();

                   // if (geocoder) {

                       // geocoder.geocode({'address': position}, function(results, status) {

                            if (map && lat && long ) {

                                 {

                                  //  map.setCenter(new google.maps.LatLng(parseFloat(lat), parseFloat(long)));

                                    //return;

                                    var infowindow = new google.maps.InfoWindow(

                                            {content: '<b>' + title + '</b>',

                                                size: new google.maps.Size(150, 50)

                                            });



                                    var marker = new google.maps.Marker({

                                        position: {"lat":parseFloat(lat), "lng":parseFloat(long)},

                                        map: map,

                                        title: title,

                                       // icon: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png'

                                    });

                                    markers.push(marker);

                                    google.maps.event.addListener(marker, 'click', function() {

                                        infowindow.open(map, marker);

                                    });



                                } 

                            }

                        

                    





                }



                initMap();



                if(scope.active_businesses && scope.active_businesses.length>0)

                for (var i = 0; i < scope.active_businesses.length; i++) {



                    setMarker(map, scope.active_businesses[i].latitude, scope.active_businesses[i].longitude, scope.active_businesses[i].company_name );

                }



            };



            return {

                restrict: 'AEC',

                template: '<div id="gmaps"></div>',

                replace: true,

                link: link,

                scope: {

                    active_businesses: "="

                }

            };

        })