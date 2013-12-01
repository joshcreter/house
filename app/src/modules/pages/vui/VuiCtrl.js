/**
 */

'use strict';

angular.module('myApp').controller('VuiCtrl', ['$scope',
function($scope) {

}]);
/*

angular.module('myApp').controller('VuiCtrl', function VuiCtrl($scope, $speechRecognition) {

    var LANG = 'en-US';
    $speechRecognition.onstart(function () {
        $speechRecognition.speak('Yes? How can I help you?');
    });
    $speechRecognition.payAttention();
    $speechRecognition.setLang(LANG);
    $speechRecognition.listen();
})
;
    */