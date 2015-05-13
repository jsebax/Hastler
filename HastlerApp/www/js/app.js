// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic', 'firebase']);
var url = "https://hastler.firebaseio.com/";
var fb = new Firebase(url);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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

    .state('tabs.myServices', {
        url: '/myServices',
        views: {
            'my-services-tab': {
                templateUrl: 'templates/home.html',
                controller: 'MyServicesController'
            }
        }
    })

    .state('tabs.search', {
        url: '/search',
        views: {
            'search-tab': {
                templateUrl: 'templates/search.html',
                controller: 'searchController'
            }
        }
    })

    .state('tabs.services', {
        url: '/services',
        views: {
            'services-tab': {
                templateUrl: 'templates/upcomingClasses.html',
                controller: 'ServicesController'
            }
        }
    })

    .state('tabs.serviceForm', {
        url: '/serviceForm',
        views: {
            'menu-tab': {
                templateUrl: 'templates/createService.html',
                controller: 'ServiceFormController'
            }
        }
    })

    .state('tabs.profile', {
        url: '/profile',
        views: {
            'menu-tab': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileController'
            }
        }
    })

    .state('tabs.menu', {
        url: '/menu',
        views: {
            'menu-tab': {
                templateUrl: 'templates/menu.html',
                controller: 'ProfileController'
            }
        }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});

app.controller('MainCtrl', function($scope, $state, $ionicSideMenuDelegate) { 
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
  
    $scope.changeState = function(page) {
        $state.go(page);
    }
})

app.controller("LoginController", function($scope, $firebaseAuth, $firebaseObject, $location, $ionicPopup) {
    var fbAuth = $firebaseAuth(fb);
    $scope.login = function(email, password) {
        fbAuth.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData) {
            $location.path("/tab/myServices");
        }).catch(function(error) {
            console.error("ERROR: " + error);
            $ionicPopup.alert({
                title: 'Alert',
                template: error
            });
        });
    };
});

app.controller("RegisterController", function($scope, $firebaseAuth, $firebaseObject, $location, $ionicPopup) {
    $scope.register = function(email, password, rePassword) {
        var fbAuth = $firebaseAuth(fb);
       
        if ( password != rePassword ) {
            $ionicPopup.alert({
              title: 'Passwords don\'t match',
            }).then(function(res) {
              console.log('Test Alert Box');
            });

        } else {
        
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
                                        $location.path("/myServices");
                                        window.setTimeout(function() { window.location.reload(true); }, 500);
                                    } else {
                                        //location.href = location.origin;
                                        obj.unauth();
                                        $location.path("/myServices");
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
        }
    };
});

app.controller("ProfileController", function($scope, $firebaseObject, $ionicPopup, $location, myMiddleware) {
    var auth = fb.getAuth();
    var obj = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
    var object = $firebaseObject(obj);
    $scope.list = function() {
        if(auth) {
        object.$bindTo($scope, "data");
        }
    };

    myMiddleware.x();

     $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
  
    $scope.changeState = function(page) {
        $state.go(page);
    }

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
               // window.location.reload(true);
            }
        }
    };

    $scope.toCreate = function() {
        $location.path('/tab/serviceForm');
    };

    $scope.toProfile = function() {
        $location.path('/tab/profile');
    };

    $scope.updateRecords = function(name, lastname, tel) {
        if(auth) {
            if(name !== undefined) {
                object.name = name;
            }
            if(lastname !== undefined) {
                object.lastname = lastname;
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

app.controller("ServicesController", function($scope, $firebaseObject, $ionicPopup, $location) {
    var auth = fb.getAuth();
    var obj = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
    var object = $firebaseObject(obj);
    $scope.list = function() {
        if(auth) {
            object.$bindTo($scope, "data");
        }
    };
  
});

app.controller("ServiceFormController", function($scope, $firebaseObject, $ionicPopup, $location) {
    var auth = fb.getAuth();
    var obj1 = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
    var obj2 = new Firebase("https://hastler.firebaseio.com/services/");
    var object1 = $firebaseObject(obj1);
    var object2 = $firebaseObject(obj2);
    $scope.list = function() {
        if(auth) {
            object1.$bindTo($scope, "data");
            object2.$bindTo($scope, "data2");
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

        if($scope.data2.hasOwnProperty("services") !== true) {
            $scope.data2.services = [];
        }

        $scope.data2.services.push({
            title: title,
            owner: $scope.data.hastly,
            category: category,
            id: auth.uid
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

app.controller('MyServicesController', function($scope, $firebaseObject, $ionicPopup, $location) {
    var auth = fb.getAuth();
    var obj1 = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
    var obj2 = new Firebase("https://hastler.firebaseio.com/services/");
    var object1 = $firebaseObject(obj1);
    var object2 = $firebaseObject(obj2);
    $scope.serviceList = [];
    $scope.myServiceList = [];

    $scope.list = function() {
        if(auth) {
            object1.$bindTo($scope, "data").then(function() {
                $scope.myServiceList = $scope.data.myServices;
            });
            object2.$bindTo($scope, "data2").then(function() {
                $scope.serviceList = $scope.data2.services;
            });
        }
    };

    $scope.adquire = function(service) {
        if(auth) {
            if($scope.data.hasOwnProperty("myServices") !== true) {
                $scope.data.myServices = [];
            }

            $scope.data.myServices.push(service);

            $location.path("/tab/myServices");
        }
    }
});

app.controller('searchController', function($scope, $firebaseObject, $ionicPopup, $location) {
    var auth = fb.getAuth();
    var obj1 = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
    var obj2 = new Firebase("https://hastler.firebaseio.com/services/");
    var object1 = $firebaseObject(obj1);
    var object2 = $firebaseObject(obj2);
    $scope.serviceList = [];
    $scope.myServiceList = [];

    $scope.list = function() {
        if(auth) {
            object1.$bindTo($scope, "data").then(function() {
                $scope.myServiceList = $scope.data.myServices;
            });
            object2.$bindTo($scope, "data2").then(function() {
                $scope.serviceList = $scope.data2.services;
            });
        }
    };

    $scope.adquire = function(service) {
        if(auth) {
            if($scope.data.hasOwnProperty("myServices") !== true) {
                $scope.data.myServices = [];
            }

            $scope.data.myServices.push(service);

            $location.path("/tab/myServices");
        }
    }
});
