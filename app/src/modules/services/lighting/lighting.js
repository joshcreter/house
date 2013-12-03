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

angular.module('app').factory('appLighting', function(){
    //['$http', function($http) {

	return {
		test: function(input) {
			return 'factory input: '+input;
		},

        allLightsOn: function() {
            console.log("allLightsOn");
            var doRequest = function() {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/api/hue',
                    data: {rpc: '{"method":"Hue.allLightsOn","params":{}}'}

                });
            };
            return {
                events: function() { return doRequest(); }
            };

        },

        allLightsOff: function() {
            console.log("allLightsOff");

            var doRequest = function() {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/api/hue',
                    data: {rpc: '{"method":"Hue.allLightsOff","params":{}}'}

                });
            };
            return {
                events: function() { return doRequest(); }
            };

        }
	};
});