let angular= require('angular');
let router= require('angular-ui-router');

let app= angular.module('profile',['ui.router']);

let DOMStuff= require('./dom.js')();

app.controller('homeCtrl', ["$scope",($scope)=> {
	$scope.show_nav= DOMStuff.toggle_nav;
	$scope.startLoading= DOMStuff.start_loading;
	$scope.stopLoading= DOMStuff.stop_loading;

	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
	    if (toState.resolve) {
	        $scope.startLoading();
	    }
	});
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	    if (toState.resolve) {
	        $scope.stopLoading();
	    }
	});
}]);

app.config(['$urlRouterProvider','$stateProvider', ($urlRouterProvider,$stateProvider)=> {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			template: 'hello'
		})
		.state('info', {
			url: '/info',
			template: 'Info'
		})
		.state('settings', {
			url: '/settings',
			template: 'Settings'
		});
}]);