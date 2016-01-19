var app = angular.module('chirpApp', ['ngRoute', 'ngResource', 'ngCookies']).run(function($cookies, $rootScope,$http) {
  // $rootScope.authenticated = false;
  $rootScope.authenticated = Boolean($cookies.authenticated);
  $rootScope.current_user = $cookies.current_user || null;
  
  $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      delete $cookies.authenticated;
      delete $cookies.current_user;
      $rootScope.current_user = '';
  };
});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html', 
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});

app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});




app.controller('mainController', function(postService, $scope, $rootScope){
  $scope.posts = postService.query();
  $scope.newPost = {created_by: '', text: '', created_at: ''};
  
  $scope.post = function() {
    $scope.newPost.created_by = $rootScope.current_user;
    $scope.newPost.created_at = Date.now();
    postService.save($scope.newPost, function(){
      $scope.posts = postService.query();
      $scope.newPost = {created_by: '', text: '', created_at: ''};
    });
  };
});

app.controller('authController', function($scope, $http, $rootScope, $location, $cookies){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $cookies.authenticated = 'true';
        $cookies.current_user = data.user.username;
        $rootScope.current_user = data.user.username;
        
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $cookies.authenticated = 'true';
        $cookies.current_user = data.user.username;
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;

        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});