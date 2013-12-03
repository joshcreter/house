'use strict';

describe('OkCtrl', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('OkCtrl', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});