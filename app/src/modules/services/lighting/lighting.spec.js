'use strict';

describe('appLighting factory', function() {
	var scope ={}, appLighting;
	
	// beforeEach(module('myApp'));
	beforeEach(module('app'));
	
	beforeEach(inject(function(_$rootScope_, _appLighting_) {
		appLighting =_appLighting_;
		
		scope = _$rootScope_.$new();
	}));
	
	afterEach(function() {
	});
	
	/*
	it('should do something', function() {
	});
	*/
});