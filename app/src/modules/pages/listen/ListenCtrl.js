(function () {
    'use strict';
    angular.module('myApp').controller('ListenCtrl', ['$scope', '$speechRecognition', 'appLighting', function ($scope, $speechRecognition, appLighting) {
        var LANG = 'en-US';

        $speechRecognition.onstart(function (e) {
            $speechRecognition.speak('Yes?');
        });

        $speechRecognition.onerror(function (e) {
            var error = (e.error || '');
            alert('An error occurred ' + error);
        });
        $speechRecognition.payAttention();
        $speechRecognition.setLang(LANG);
        $speechRecognition.listen();

        $scope.recognition = {};
        $scope.recognition['en-US'] = {
            'command': {
                'regex': /^computer .+/gi,
                'lang': 'en-US',
                'call': function (utterance) {

                    console.log(utterance);
                    $speechRecognition.speak('OK');

                }
            },
            'on': {
                'regex': /^lights on/gi,
                'lang': 'en-US',
                'call': function (utterance) {

                    console.log(utterance);
                    appLighting.allLightsOn();
                    $speechRecognition.speak('OK');

                }
            },
            'off': {
                'regex': /^lights off/gi,
                'lang': 'en-US',
                'call': function (utterance) {

                    console.log(utterance);
                    appLighting.allLightsOff();
                    $speechRecognition.speak('OK');
                }
            }
        };

        var ignoreUtterance = {};
        ignoreUtterance['command'] = $speechRecognition.listenUtterance($scope.recognition['en-US']['command']);
        ignoreUtterance['off'] = $speechRecognition.listenUtterance($scope.recognition['en-US']['off']);
        ignoreUtterance['on'] = $speechRecognition.listenUtterance($scope.recognition['en-US']['on']);
    }]);
});
