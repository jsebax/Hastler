var firebaseApp = angular.module('starter', ['ionic', 'firebase']);
var url = "https://hastler.firebaseio.com/";
var fb = new Firebase(url);

firebaseApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    fb = new Firebase(url);
  });
});

firebaseApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
      })
      .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tabs.profile', {
        url: '/profile',
        views: {
          'profile-tab': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
          }
        }
      })
      .state('tabs.services', {
        url: '/services',
        views: {
          'services-tab': {
            templateUrl: 'templates/services.html'
          }
        }
      })
      .state('tabs.account', {
        url: '/account',
        views: {
          'account-tab': {
            templateUrl: 'templates/account.html',
            controller: 'LoginController'
          }
        }
      });
      $urlRouterProvider.otherwise('/login');
});

firebaseApp.controller("LoginController", function($scope, $firebaseAuth, $firebaseObject, $location, $ionicPopup) {
  var fbAuth = $firebaseAuth(fb);
  $scope.login = function(email, password) {
    fbAuth.$authWithPassword({
      email: email,
      password: password
    }).then(function(authData) {
      $location.path("/tab/profile");
    }).catch(function(error) {
      console.error("ERROR: " + error);
      $ionicPopup.alert({
        title: 'Alert',
        template: error
      });
    });
  };

  $scope.toRegister = function() {
    $location.path("/register");
  };

  $scope.logout = function() {
    var firebaseAuth = fb.getAuth();
    if(firebaseAuth) {
      if(navigator.userAgent.indexOf('Android') != -1) {
        window.location = window.location.origin;
      } else {
        location.href = location.origin;
      }
    }
  };
});

firebaseApp.controller("RegisterController", function($scope, $firebaseAuth, $firebaseObject, $location, $ionicPopup) {
  $scope.register = function(email, password) {
    var fbAuth = $firebaseAuth(fb);
    fbAuth.$createUser({
      email: email,
      password: password
    }).then(function() {

      return fbAuth.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
        var obj = new Firebase("https://hastler.firebaseio.com/users/" + authData.uid);
        var object = $firebaseObject(obj);

        object.name = "Put your Name";
        object.lastname = "Put your Lastname";
        object.hastly = "#hastly";
        object.email = email;
        object.tel = "Put your Phone";

        return object.$save().then(function(ref) {
          console.log(ref.key() === object.$id);
          object.$bindTo($scope, "data");
          $ionicPopup.show({
            title: 'User created successfully',
            buttons: [{
              text: 'OK',
              type: 'button-positive',
              onTap: function() {
                location.href = location.origin;
              }
            }]
          });
        }, function(error) {
          console.log("ERROR: " + error);
          $ionicPopup.alert({
            title: 'Alert',
            template: error
          });
        });
      });
    }).catch(function(error) {
      console.error("ERROR:" + error);
      $ionicPopup.alert({
        title: 'Alert',
        template: error
      });
    });
  };

  $scope.cancel = function() {
    $location.path("/login");
  }
});

firebaseApp.controller("ProfileController", function($scope, $firebaseObject, $ionicPopup, $location) {
  var auth = fb.getAuth();
  var obj = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
  var object = $firebaseObject(obj);
  $scope.list = function() {
    if(auth) {
      object.$bindTo($scope, "data");
    }
  };

  $scope.updateRecords = function(name, lastname, hastly, tel) {
    if(auth) {
      if(name !== undefined) {
        object.name = name;
      }
      if(lastname !== undefined) {
        object.lastname = lastname;
      }
      if(hastly !== undefined) {
        object.hastly = hastly;
      }
      if(tel !== undefined) {
        object.tel = tel;
      }
      object.$save().then(function(ref) {
        console.log(ref.key() === object.$id);
        $ionicPopup.show({
          title: 'Changes Saved Successfully',
          buttons: [{
            text: 'OK',
            type: 'button-positive',
            onTap: function() {
              $location.path("/tab/profile");
            }
          }]
        });
      }, function(error) {
        console.log("ERROR: " + error);
        $ionicPopup.alert({
          title: 'Alert',
          template: error
        });
      });
    }
  };
});