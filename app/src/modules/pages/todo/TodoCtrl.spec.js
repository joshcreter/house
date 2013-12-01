'use strict';

describe('TodoCtrl', function(){
	var ctrl, scope ={};
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('TodoCtrl', {$scope: scope});
	}));
	
	/*
	it('should do something', function() {
	});
	*/
});