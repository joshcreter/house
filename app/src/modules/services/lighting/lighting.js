/**
 A factory style service (simple but can not be injected during the compile phase like a provider can be), see here for more info: http://stackoverflow.com/questions/15666048/angular-js-service-vs-provider-vs-factory

 @toc
 //TODO

 @usage
 //js Angular controller:
 angular.module('myApp').controller('TestCtrl', ['$scope', 'appLighting', function($scope, appLighting) {
	var retVal =(appLighting.test('my test val'));
	console.log(retVal);
}]);

 */

'use strict';

angular.module('app').factory('appLighting', ['$http', 'appHttp', function ($http, appHttp) {

    return {
        test: function (input) {
            return 'factory input: ' + input;
        },

        allLightsOn: function () {
            var rpcData = "rpc=" + encodeURIComponent(
                '{"method": "Hue.allLightsOn", "params": {}}'
            );

            return this.callApi(rpcData);

        },

        allLightsOff: function () {
            var rpcData = "rpc=" + encodeURIComponent(
                '{"method": "Hue.allLightsOff", "params": {}}'
            );

            return this.callApi(rpcData);
        },

        callApi: function(rpcData) {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/hue/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: rpcData
            });

            var doRequest = function () {

            };
            return {
                events: function () {
                    return doRequest();
                }
            };

        }
    };
}]);