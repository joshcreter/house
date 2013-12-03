(function () {
    'use strict';
    angular.module('myApp').controller('ListenCtrl', [$scope, $speechRecognition, function($scope, $speechRecognition) {
        var LANG = 'en-US';

        var retVal =(appLighting.test('my test val'));
        console.log(retVal);
        appLighting.allLightsOn();
        appLighting.allLightsOff();

        $speechRecognition.onstart(function(e){
            $speechRecognition.speak('Yes?');
        });

        $speechRecognition.onerror(function(e){
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
                'call': function(utterance){

                    console.log(utterance);
                    $speechRecognition.speak('OK');

                }
            }
        };

        var ignoreUtterance = {};
        ignoreUtterance['command'] = $speechRecognition.listenUtterance($scope.recognition['en-US']['command']);
    }]);
});
