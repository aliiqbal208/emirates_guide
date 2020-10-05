(function () {

    angular.module('HttpServiceModule',[])
        .service('HttpService', HttpService);

    HttpService.$inject = ['$q', '$http'];

    function HttpService($q, $http) {



        var _Get = function (url, reqData) {

            var build_url = base_url+url;
            return _SendRequest('GET', build_url, reqData);

        }

        // var _Post = function (url, reqData) {
        //     var build_url = base_url+url;
        //     return _SendRequest('POST', build_url, reqData);

        // };
       
        var _Post = function (url, reqData, header) {
            
            var build_url = base_url+url;
            if(header)
            return _SendRequest('POST', build_url, reqData,header);

            return _SendRequest('POST', build_url, reqData);

        };

        var _Put = function (url, reqData) {
            var build_url = base_url+url;
            return _SendRequest('PUT', build_url, reqData);

        };

        var _Delete = function (url, reqData) {
            var build_url = base_url+url;
            console.log("reqData " + reqData);
            return _SendRequest('Delete', base_url, reqData);

        }

        //var _Delete = function (url, reqData,header) {
        //    //console.log("reqData " + reqData);
        //    return _SendRequest('Delete', url, reqData,header);

        //}



        var _SendRequest = function (method, url, reqData,header) {
            
            var req = "";

            req = {
                'method': method,

                'url':  url,

                'data': reqData
            };

            var deferred = $q.defer();

            var headers = {};

            if (header) {
                headers['Content-Type'] = header || undefined;
            }
            else {
                headers['Content-Type'] = 'application/json';
            }
            req['headers'] = headers;

            var _successCallback = function (data) {
                console.log("In Success call back");
                
                deferred.resolve(data);
            };

            var _errorCallback = function (data) {
                deferred.reject(data);
                //alert(JSON.stringify(data));
            };
            console.log("API URl " + req.url);
            console.log("Req " + JSON.stringify(req.data));

            $http(req)
                .success(_successCallback)
                .error(_errorCallback);

            return deferred.promise;
        };

        var service = {
            Get: _Get,
            Post: _Post,
            Put: _Put,
            Delete: _Delete
        }

        return service;

    }

})()
