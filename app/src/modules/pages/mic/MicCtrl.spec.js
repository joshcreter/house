'use strict';

describe('MicCtrl', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('MicCtrl', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});