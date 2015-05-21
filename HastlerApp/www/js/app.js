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

    .state('resetPassword', {
        url: '/resetPassword',
        templateUrl: 'templates/resetPassword.html',
        //controller: 'resetPasswordController'
    })

    //Templates Registro
    //Tamplate Email
    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })

    .state('registerPassword', {
        url: '/registerPassword',
        templateUrl: 'templates/registerPassword.html',
        controller: 'RegisterController'
    })

    .state('registerName', {
        url: '/registerName',
        templateUrl: 'templates/registerName.html',
        controller: 'RegisterController'
    })

    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
        url: '/home',
        views: {
            'home-tab': {
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

app.controller("LoginController", function($scope, $firebaseAuth, $firebaseObject, $location, $ionicPopup, myMiddleware) {
    
    $scope.toResetPassword = function() {
        $location.path('/resetPassword');
    };

    $scope.login = function(email, password) {
        $scope.user = [];
        $scope.user.password = password;
        $scope.user.email = email;
        $scope.loginsuccess = false;
        myMiddleware.login($scope.user,function(data){
            $scope.loginsuccess = data;
            console.log($scope.loginsuccess);
            if(!$scope.loginsuccess){
                alert("El email o la contraseña no son correctos");
            }else{
                console.log("entro...");
                var emaildiv = document.getElementById("email"); 
                //document.getElementById("email").value; da el valor del email
                emaildiv.innerHTML = email;
                $location.path('/tab/home');
            }
        });
    };
});

app.controller("RegisterController", function($scope, $firebaseAuth, $firebaseObject, $location, $ionicPopup, myMiddleware) {

    $scope.register = function(mail, pass, Name, lastname) {
        var fbAuth = $firebaseAuth(fb);
        $scope.user = [];
        $scope.user.password = pass;
        $scope.user.email = mail;

        $scope.profile = [];
        $scope.profile.name = Name;
        $scope.profile.email = mail;
        $scope.singonsuccess = true;
        myMiddleware.singon($scope.user);
        alert($scope.singonsuccess);
        if($scope.singonsuccess){
            $scope.profilesuccess = true;
            myMiddleware.agregarPersona($scope.profile,function(dataprofile){
                $scope.profilesuccess = dataprofile;
                if($scope.profilesuccess){
                    myMiddleware.login($scope.user,function(data){
                        $scope.loginsuccess = data;
                        if(!$scope.loginsuccess){
                            alert("Desafortunadamente se tuvo un problema al intentar loguearse, por favor intente denuevo más tarde.");
                            $location.path('/login');
                        }else{
                            var emaildiv = document.getElementById("email");
                            emaildiv.innerHTML = $scope.user.email;
                            $location.path('/tab/home');
                        }
                    });
                }else{
                    $location.path('/login');
                    alert("Desafortunadamente se tuvo un problema al intentar loguearse, por favor intente denuevo más tarde.");
                }
            });
        }else{            
            $location.path=('/register');
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
                //window.location.reload(true);
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

app.controller("ServiceFormController", function($scope, $firebaseObject, $ionicPopup, $location, myMiddleware ) {
    var auth = fb.getAuth();
    var obj1 = new Firebase("https://hastler.firebaseio.com/users/" + auth.uid);
    var obj2 = new Firebase("https://hastler.firebaseio.com/services/");
    var object1 = $firebaseObject(obj1);
    $scope.service = [];
    
    $scope.list = function() {
        if(auth) {
            object1.$bindTo($scope, "data");
        }
    };

    $scope.create = function(title, category) {
        $scope.service.serviceName = title;
        $scope.service.owner = $scope.data.hastly;
        $scope.service.category = category;
        myMiddleware.guardarServicio($scope.service);
/*
        $scope.data.services.push({
            title: title,
            owner: $scope.data.hastly,
            category: category
        });
*/
        $location.path("/tab/services");
    };

    $scope.categories = [
        "Academy",
        "Music"
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
