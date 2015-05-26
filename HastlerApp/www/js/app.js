// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic', 'ngCordova','ionic.rating']);


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

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })

    .state('resetPassword', {
        url: '/resetPassword',
        templateUrl: 'templates/resetPassword.html',
        controller: 'resetPasswordController'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })

    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'tabController'
    })

    .state('tabs.home', {
        url: '/home',
        views: {
            'home-tab': {
                templateUrl: 'templates/home.html',
                controller: 'homeController'
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

    .state('tabs.upComingClasses', {
        url: '/upComingClasses',
        views: {
            'upComingClasses-tab': {
                templateUrl: 'templates/upcomingClasses.html',
                controller: 'upComingClassesController'
            }
        }
    })

    .state('tabs.myCreateServices', {
        url: '/myCreateServices',
        views: {
            'menu-tab': {
                templateUrl: 'templates/myCreateServices.html',
                controller: 'myCreateServicesController'
            }
        }
    })

    .state('tabs.serviceForm', {
        url: '/serviceForm',
        views: {
            'menu-tab': {
                templateUrl: 'templates/serviceForm.html',
                controller: 'ServiceFormController'
            }
        }
    })

    .state('tabs.editService', {
        url: '/editService',
        views: {
            'menu-tab': {
                    templateUrl: 'templates/editService.html',
                    controller: 'editServiceController'
            }
        }
    })

    .state('tabs.service', {
        url: '/service',
        views: {
            'menu-tab': {
                templateUrl: 'templates/service.html',
                controller: 'serviceController'
            }
        }
    })

    .state('tabs.myProfile', {
        url: '/myProfile',
        views: {
            'menu-tab': {
                templateUrl: 'templates/myProfile.html',
                controller: 'myProfileController'
            }
        }
    })

    .state('tabs.menu', {
        url: '/menu',
        views: {
            'menu-tab': {
                templateUrl: 'templates/menu.html',
                controller: 'menuController'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});

app.controller("serviceController", function($scope, $ionicPopup, $location, myMiddleware) {

    var object = [];

    $scope.list = function() {
        $scope.service = window.localStorage['service'];
        object.id = $scope.service.id;
        console.log("el servicio a mostrar tiene id: " + object.id);
    };  

});

app.controller("editServiceController", function($scope, $ionicPopup, $location, myMiddleware) {

    var object = [];

    $scope.list = function() {
        $scope.service = [];
        $scope.service.id = window.localStorage['serviceId'];
        $scope.service.serviceName =window.localStorage['serviceName'];
        $scope.service.owner = window.localStorage['owner'];
        $scope.service.category = window.localStorage['category'];
        $scope.service.city =window.localStorage['city'];
        object.id = $scope.service.id;
        console.log("el servicio a cambiar tiene id: " + object.id);
    };


    $scope.updateRecords = function(name,category,city){
        object.id =$scope.service.id;
        object.serviceName = name;
        object.category = category;
        object.city = city;
        myMiddleware.editarServicio(object,function(data){
            if(data){
                $ionicPopup.show({
                    title: 'Changes have been saved!',
                    buttons: [{
                        text: 'OK',
                        type: 'button-positive',
                        onTap: function() {
                            $location.path('/tab/myCreateServices');
                            window.setTimeout(function() { window.location.reload(true); }, 250);
                        }
                    }]
                });
            }else{
                var error = "no se ha podido editar el servicio por favor intentelo más tarde";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                });
            }
        });
    }

    $scope.categories = [
        "Academic",
        "Music"
    ];
  

});

app.controller("LoginController", function($scope, $location, $ionicPopup, $cordovaFacebook, myMiddleware) {

    $scope.session = function(){
        if(window.localStorage['email']!=''&&
                window.localStorage['email']!=undefined){
             $location.path('/tab/home');
        }
    };

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
                var error = "El email o la contraseña no son correctos";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                });
            }else{
                console.log("entro...");
                window.localStorage['email']= email;
                $location.path('/tab/home');
            }
        });
    };

    /*
     * Learn how facebooks graph api works: https://developers.facebook.com/docs/graph-api/quickstart/v2.2
     * The array params "public_profile", "email", "user_friends" are the permissions / data that the app is trying to access.
    */
    $scope.fbLogin = function() {
        $cordovaFacebook.login(["public_profile", "email", "user_friends"])
        .then(function(success) {
            /*
             * Get user data here.
             * For more, explore the graph api explorer here: https://developers.facebook.com/tools/explorer/
             * "me" refers to the user who logged in. Don't confuse it as some hardcoded string variable.
             *
            */
            //To know more available fields go to https://developers.facebook.com/tools/explorer/
            $cordovaFacebook.api("me?fields=id,name,picture,email", [])
            .then(function(result) {
                /*
                 * As an example, we are fetching the user id, user name, and the users profile picture
                 * and assigning it to an object and then we are logging the response.
                */
                var userData = {
                    id: result.id,
                    name: result.name,
                    pic: result.picture.data.url,
                    email: result.email
                }
                //Do what you wish to do with user data. Here we are just displaying it in the view
                myMiddleware.emailCheck(userData,function(data){
                    if(data){
                        console.log("entro...");
                        window.localStorage['email']= userData.email;
                        $location.path('/tab/home');
                    }else{
                        $ionicPopup.prompt({
                           title: 'Password Choice',
                           template: 'Enter your secret password',
                           inputPlaceholder: 'Your password'
                         }).then(function(res) {
                            $scope.register(userData.email,res,userData.name,'');
                         });
                    }
                });

            }, function(error) {
                //Error message
            })

        }, function(error) {
            // Facebook returns error message due to which login was cancelled.
            // Depending on your platform show the message inside the appropriate UI widget
            // For example, show the error message inside a toast notification on Android
        });
    };

    $scope.register = function(mail, pass, name, lastName) {
        $scope.user = [];
        $scope.user.password = pass;
        $scope.user.email = mail;

        $scope.profile = [];
        $scope.profile.name = name;
        $scope.profile.lastName = lastName
        $scope.profile.email = mail;
        $scope.singonsuccess = true;
        myMiddleware.singon($scope.user);
        if($scope.singonsuccess){
            $scope.profilesuccess = true;
            myMiddleware.agregarPersona($scope.profile,function(dataprofile){
                $scope.profilesuccess = dataprofile;
                if($scope.profilesuccess){
                    myMiddleware.login($scope.user,function(data){
                        $scope.loginsuccess = data;
                        if(!$scope.loginsuccess){
                            var error = "Desafortunadamente se tuvo un problema al intentar loguearse, por favor intente denuevo más tarde.";
                            console.log("ERROR: " + error);
                            $ionicPopup.alert({
                                title: 'Alert',
                                template: error
                            });
                            $location.path('/login');
                        }else{
                            window.localStorage['email']= $scope.user.email;
                            $location.path('/tab/home');
                        }
                    });
                }else{
                    $location.path('/login');
                    var error = "Desafortunadamente se tuvo un problema al intentar loguearse, por favor intente denuevo más tarde.";
                    console.log("ERROR: " + error);
                    $ionicPopup.alert({
                        title: 'Alert',
                        template: error
                    });
                }
            });
        }else{            
            $location.path=('/register');
        }
        
    };

});

app.controller("tabController", function($scope, $location, $ionicPopup, myMiddleware) {

    $scope.toHome=function(){
        $location.path('/tab/home');
         window.setTimeout(function() { window.location.reload(true); }, 250);
    };

    $scope.toSearch=function(){
        $location.path('/tab/search');
         window.setTimeout(function() { window.location.reload(true); }, 250);
    };

    $scope.toUpComingClasses=function(){
        $location.path('/tab/upComingClasses');
         window.setTimeout(function() { window.location.reload(true); }, 250);
    };
    
});

app.controller("resetPasswordController", function($scope, $location, $ionicPopup, myMiddleware) {
    $scope.reset = function(email) {        
        $ionicPopup.show({
            title: 'An email was sent',
            buttons: [{
                text: 'OK',
                type: 'button-positive',
                onTap: function() {
                    $location.path("/login");
                }
            }]
        });
    };
    
});


app.controller("RegisterController", function($scope, $location, $ionicPopup, myMiddleware) {

    $scope.register = function(mail, pass, name, lastName) {
        $scope.user = [];
        $scope.user.password = pass;
        $scope.user.email = mail;

        $scope.profile = [];
        $scope.profile.name = name;
        $scope.profile.lastName = lastName
        $scope.profile.email = mail;
        $scope.singonsuccess = true;
        myMiddleware.singon($scope.user);
        if($scope.singonsuccess){
            $scope.profilesuccess = true;
            myMiddleware.agregarPersona($scope.profile,function(dataprofile){
                $scope.profilesuccess = dataprofile;
                if($scope.profilesuccess){
                    myMiddleware.login($scope.user,function(data){
                        $scope.loginsuccess = data;
                        if(!$scope.loginsuccess){
                            var error = "Desafortunadamente se tuvo un problema al intentar loguearse, por favor intente denuevo más tarde.";
                            console.log("ERROR: " + error);
                            $ionicPopup.alert({
                                title: 'Alert',
                                template: error
                            });
                            $location.path('/login');
                        }else{
                            window.localStorage['email']= $scope.user.email;
                            $location.path('/tab/home');
                        }
                    });
                }else{
                    $location.path('/login');
                    var error = "Desafortunadamente se tuvo un problema al intentar loguearse, por favor intente denuevo más tarde.";
                    console.log("ERROR: " + error);
                    $ionicPopup.alert({
                        title: 'Alert',
                        template: error
                    });
                }
            });
        }else{            
            $location.path=('/register');
        }
        
    };
});

app.controller("myProfileController", function($scope, $ionicPopup, $location, myMiddleware) {

    var object = [];

    $scope.list = function() {
        $scope.person = [];
        $scope.person.email =  window.localStorage['email']
        console.log("el email dado es: "+$scope.person.email);
        myMiddleware.obtenerPersonaEmail($scope.person,function(data){
            data.lastname =data.lastName;
            object = data;
            console.log("ya hay data y su nombre es: "+ data.name+ " last:"+data.lastName);
            if($scope.person.email!= undefined) {
                $scope.data = object;
            }
        });
    };

    $scope.logout = function() {
        if(navigator.userAgent.indexOf('Android') != -1) {
            window.localStorage['email'] = '';
            $location.path("/login");
            window.setTimeout(function() { window.location.reload(true); }, 500);
        } else {
            //location.href = location.origin;
            window.localStorage['email'] = '';
            $location.path("/login");
            //window.location.reload(true);
        }
    };

    $scope.updateRecords = function(name, lastname, tel) {
        if(document.getElementById("email").value!='') { //si no esta logeado
            object.id = $scope.data.id; //este id se tiene que sacar de la información del list
            if(name !== undefined) {
                object.name = name;
            }
            if(lastname !== undefined) {
                object.lastname = lastname;
            }
            if(tel !== undefined) {
                object.telephone = tel;
            }
            object.tel = object.telephone;
            object.lastName=object.lastname;
            myMiddleware.editPersona(object, function(data){

                if(data){
                    $ionicPopup.show({
                        title: 'Changes Saved Successfully',
                        buttons: [{
                            text: 'OK',
                            type: 'button-positive',
                            onTap: function() {
                                $location.path("/tab/myProfile");
                            }
                        }]
                    });
                }else{
                    var error = "no se ha podido editar";
                    console.log("ERROR: " + error);
                    $ionicPopup.alert({
                        title: 'Alert',
                        template: error
                    });
                }
            });
        }else{
            var error = "parece ser que ud no está logeado";
            console.log("ERROR: " + error);
            $ionicPopup.alert({
                title: 'Alert',
                template: error
            });
            $location.path("/login");
        }
    };
});

app.controller("menuController", function($scope, $ionicPopup, $location, myMiddleware) {

    $scope.logout = function() {
        if(navigator.userAgent.indexOf('Android') != -1) {

            window.localStorage['email'] = '';
            $location.path("/login");
            window.setTimeout(function() { window.location.reload(true); }, 500);
        } else {
            //location.href = location.origin;
            window.localStorage['email']='';
            $location.path("/login");
            //window.location.reload(true);
        }
    };

    $scope.toMyCreateServices = function() {
        $location.path('/tab/myCreateServices');
    };   

    $scope.toMyProfile = function() {
        $location.path('/tab/myProfile');
    };    
});

app.controller("upComingClassesController", function($scope, $ionicPopup, $location, myMiddleware) {

    var object = [];
    $scope.rate = 1;
    $scope.max = 5;

    $scope.list = function() {
        $scope.match = [];
        $scope.match.emailUser = window.localStorage['email'];
        myMiddleware.obtenerMatchUser($scope.match,function(data){
            if($scope.match.emailUser!= undefined) {
                for (i in data){
                    object.id = data[i].serviId;
                     myMiddleware.obtenerServiciosId(object,function(servi){
                        if(!servi){
                             var error = "error al cargar servicios";
                            console.log("ERROR: " + error);
                            $ionicPopup.alert({
                                title: 'Alert',
                                template: error
                            });
                        }else{
                            servi.matchId = data[i].id;
                            $scope.services[i] = servi;
                        }
                     });
                }
                $scope.services = object;
                console.log("hay data.");
            }
        });
    };

    $scope.delete = function(id){
        $scope.match = [];
        $scope.match.id = id;
        myMiddleware.borrarMatch($scope.match,function(data){
            if(data){
                $ionicPopup.show({
                    title: 'Match Successfully deleted',
                    buttons: [{
                        text: 'OK',
                        type: 'button-positive',
                        onTap: function() {
                            window.setTimeout(function() { window.location.reload(true); }, 500);
                        }
                    }]
                });
            }else{
                var error = "error deleting match";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                }); 
            }
        });
    };

    $scope.submitComment = function(id,content,rate){        
        myMiddleware.agregarComentario(id, content, rate, function(data){
            if(data){
                $ionicPopup.show({
                    title: 'Comment Successfully added',
                    buttons: [{
                        text: 'OK',
                        type: 'button-positive',
                        onTap: function() {
                            window.setTimeout(function() { window.location.reload(true); }, 500);
                        }
                    }]
                });
            }else{
                var error = "Error Adding Comment";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                });
            }
        });
    }
});

app.controller("ServiceFormController", function($scope, $ionicPopup, $location, myMiddleware ) {

    $scope.service = [];
    
    $scope.list = function() {
        $scope.data = [];
        $scope.person = [];
        $scope.person.email = window.localStorage['email'];
        myMiddleware.obtenerPersonaEmail($scope.person,function(data){
            if($scope.person.email!=undefined){
                $scope.data = data;
                console.log("el dueño será: "+($scope.data.name +" "+ $scope.data.lastName))
            }
        });
    };

    $scope.create = function(title, category, city) {
        $scope.service.serviceName = title;
        $scope.service.owner = ($scope.data.name +" "+ $scope.data.lastName);
        $scope.service.category = category;
        $scope.service.city = city;
        $scope.service.email =  window.localStorage['email'];
        myMiddleware.guardarServicio($scope.service,function(data){
            if (data) {
                $ionicPopup.show({
                    title: 'Service Successfully added',
                    buttons: [{
                        text: 'OK',
                        type: 'button-positive',
                        onTap: function() {
                            window.setTimeout(function() { window.location.reload(true); }, 500);
                        }
                    }]
                });
                
            }else{
                var error = "ocurrio un problema al agregar el servicio... intentelo más tarde.";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                });
            }

        });
    };

    $scope.categories = [
        "Academic",
        "Music"
    ];
});

app.controller("myCreateServicesController", function($scope, $ionicPopup, $location, myMiddleware ) {
    var object = [];

    $scope.toServiceForm = function() {
        $location.path('/tab/serviceForm');
    };

    $scope.toEditService = function(service) {
        window.localStorage['serviceId'] = service.id;
        window.localStorage['serviceName']= service.serviceName;
        window.localStorage['owner']= service.owner;
        window.localStorage['category']= service.category;
        window.localStorage['city']= service.city;
        $location.path('/tab/editService');
    };

    $scope.list = function() {
        $scope.email = window.localStorage['email'];
        $scope.servicio = [];
        $scope.servicio.email = window.localStorage['email'];
        myMiddleware.obtenerServiciosEmail($scope.servicio,function(data){
            object = data;
            if($scope.email!= undefined) {
                $scope.services = object;
                for(i in $scope.services){
                    $scope.match =[];
                    $scope.match.serviId =$scope.services[i].id;
                    myMiddleware.obtenerMatchServiId($scope.match,function(data){
                        if(!data){
                            var error = "Error trying to load matches";
                            console.log("ERROR: " + error);
                        }else{
                            $scope.services[i].matches = data;
                        }
                    });
                }
                console.log("hay data.");
            }
        });
    };

    $scope.showConfirm = function(id) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'delete',
            template: 'Are you sure you want to delete this service?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $scope.delete(id);
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.delete = function(id) {
        $scope.servicio = [];
        $scope.servicio.id = id;
        myMiddleware.borrarServicios($scope.servicio,function(data){
            if(data){
                console.log("se borro exitosamente el servicio " +id);
                $ionicPopup.show({
                    title: 'Service Successfully deleted',
                    buttons: [{
                        text: 'OK',
                        type: 'button-positive',
                        onTap: function() {
                            window.setTimeout(function() { window.location.reload(true); }, 500);
                        }
                    }]
                });
            }else{
                console.log("un problema al borrar el servicio");
                var error = "Error trying to delete the service";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                });
            }
        });
    };
});

app.controller('homeController', function($scope, $ionicPopup, $location, myMiddleware) {
    var object = [];

    $scope.list = function() {
        $scope.email = window.localStorage['email']
        myMiddleware.obtenerServiciosAll(function(data){
            object = data;
            if($scope.email!= undefined) {
                $scope.services = object;
                console.log("hay data.");
            }
        });
    };

    $scope.adquire = function(service) {
       $scope.match = [];
       $scope.match.emailUser = window.localStorage['email'];
       $scope.match.serviId = service.id;
       myMiddleware.obtenerServiciosId(service,function(data){
            if(!data){
                var error = "Error trying to adquire the service";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                });
            }else{
                if(data.email==$scope.match.emailUser){
                    var error = "This services is yours";
                    console.log("ERROR: " + error);
                    $ionicPopup.alert({
                        title: 'Alert',
                        template: error
                    });
                }else{
                    myMiddleware.agregarMatch($scope.match,function(data){
                        if(data){
                            $ionicPopup.show({
                                title: 'Service Successfully adquired',
                                buttons: [{
                                    text: 'OK',
                                    type: 'button-positive',
                                    onTap: function() {
                                        window.setTimeout(function() { window.location.reload(true); }, 500);
                                    }
                                }]
                            });
                        }else{
                            var error = "Error trying to adquire the service";
                            console.log("ERROR: " + error);
                            $ionicPopup.alert({
                                title: 'Alert',
                                template: error
                            });
                        }
                   });
                }
            }
       });
       
   };
});

app.controller('searchController', function($scope, $ionicPopup, $location, myMiddleware) {
    var object = [];

    $scope.list = function() {
        $scope.email = window.localStorage['email'];
        myMiddleware.obtenerServiciosAll(function(data){
            object = data;
            if($scope.email!= undefined) {
                $scope.services = object;
                console.log("hay data.");
                console.log(window.localStorage['email']);
            }
        });
    };

   $scope.adquire = function(service) {
       $scope.match = [];
       $scope.match.emailUser = window.localStorage['email'];
       $scope.match.serviId = service.id;
       myMiddleware.obtenerServiciosId(service,function(data){
            if(!data){
                var error = "Error trying to adquire the service";
                console.log("ERROR: " + error);
                $ionicPopup.alert({
                    title: 'Alert',
                    template: error
                });
            }else{
                if(data.email==$scope.match.emailUser){
                    var error = "This services is yours";
                    console.log("ERROR: " + error);
                    $ionicPopup.alert({
                        title: 'Alert',
                        template: error
                    });
                }else{
                    myMiddleware.agregarMatch($scope.match,function(data){
                        if(data){
                            $ionicPopup.show({
                                title: 'Service Successfully adquired',
                                buttons: [{
                                    text: 'OK',
                                    type: 'button-positive',
                                    onTap: function() {
                                        window.setTimeout(function() { window.location.reload(true); }, 500);
                                    }
                                }]
                            });
                        }else{
                            var error = "Error trying to adquire the service";
                            console.log("ERROR: " + error);
                            $ionicPopup.alert({
                                title: 'Alert',
                                template: error
                            });
                        }
                   });
                }
            }
       });
       
   };
});
