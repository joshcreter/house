/**
*/

'use strict';

angular.module('myApp').controller('ListenCtrl', ['$scope',
function($scope) {
    $scope.speech = {
        maxResults: 25,
        continuous: true,
        interimResults: true,
        value: ''
    };
}]);