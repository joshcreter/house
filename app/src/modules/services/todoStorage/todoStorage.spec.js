'use strict';

describe('appTodoStorage factory', function() {
	var scope ={}, appTodoStorage;
	
	// beforeEach(module('myApp'));
	beforeEach(module('app'));
	
	beforeEach(inject(function(_$rootScope_, _appTodoStorage_) {
		appTodoStorage =_appTodoStorage_;
		
		scope = _$rootScope_.$new();
	}));
	
	afterEach(function() {
	});
	
	/*
	it('should do something', function() {
	});
	*/
});