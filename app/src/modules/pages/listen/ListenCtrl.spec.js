'use strict';

describe('ListenCtrl', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('ListenCtrl', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});