'use strict';

describe('VuiCtrl', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('VuiCtrl', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});