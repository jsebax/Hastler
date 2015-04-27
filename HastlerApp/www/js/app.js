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
      .state('tabs.myServices', {
        url: '/myServices',
        views: {
          'my-services-tab': {
            templateUrl: 'templates/myServices.html'
          }
        }
      })
      .state('tabs.services', {
        url: '/services',
        views: {
          'services-tab': {
            templateUrl: 'templates/services.html',
            controller: 'ServicesController'
          }
        }
      })
      .state('tabs.serviceForm', {
        url: '/serviceForm',
        views: {
          'services-tab': {
            templateUrl: 'templates/serviceForm.html',
            controller: 'ServiceFormController'
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
    var obj = new Firebase("https://hastler.firebaseio.com/users/" + firebaseAuth.uid);
    if(firebaseAuth) {
      if(navigator.userAgent.indexOf('Android') != -1) {
        obj.unauth();
        $location.path("/login");
        window.setTimeout(function() { window.location.reload(true); }, 500);
      } else {
        //location.href = location.origin;
        obj.unauth();
        $location.path("/login");
        window.location.reload(true);
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

        object.name = "";
        object.lastname = "";
        object.hastly = "#";
        object.email = email;
        object.tel = "";

        return object.$save().then(function(ref) {
          console.log(ref.key() === object.$id);
          object.$bindTo($scope, "data");
          $ionicPopup.show({
            title: 'User created successfully',
            buttons: [{
              text: 'OK',
              type: 'button-positive',
              onTap: function() {
                if(navigator.userAgent.indexOf('Android') != -1) {
                  obj.unauth();
                  $location.path("/login");
                  window.setTimeout(function() { window.location.reload(true); }, 500);
                } else {
                  //location.href = location.origin;
                  obj.unauth();
                  $location.path("/login");
                  window.setTimeout(function() { window.location.reload(true); }, 500);
                }
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
        object.hastly = "#" + hastly;
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

firebaseApp.controller("ServicesController", function($scope, $firebaseObject, $ionicPopup, $location) {
  var auth = fb.getAuth();
  var obj = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
  var object = $firebaseObject(obj);
  $scope.list = function() {
    if(auth) {
      object.$bindTo($scope, "data");
    }
  };

  $scope.toCreate = function() {
    $location.path('/tab/serviceForm');
  };
});

firebaseApp.controller("ServiceFormController", function($scope, $firebaseObject, $ionicPopup, $location) {
  var auth = fb.getAuth();
  var obj = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
  var object = $firebaseObject(obj);
  $scope.list = function() {
    if(auth) {
      object.$bindTo($scope, "data");
    }
  };

  $scope.create = function(title, category) {
    if($scope.data.hasOwnProperty("services") !== true) {
      $scope.data.services = [];
    }
    $scope.data.services.push({
      title: title,
      owner: $scope.data.hastly,
      category: category
    });

    $location.path("/tab/services");
  };

  $scope.categories = [
    "Academy",
    "Consultancy",
    "Music",
    "Software",
    "Other"
  ];
});