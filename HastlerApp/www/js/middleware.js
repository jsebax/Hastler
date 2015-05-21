/*
ENTIDADES:
	
	user:
		-id;
		-username;
		-password;
		-email;
		
	person:
		-id;
		-hastly;
		-name;
		-lastName;
		-telephone;
		-email;
		-image;
		
	servi:
		-id;
		-serviceName;
		-category;
		-owner;	
		-cellPhone;
		-email;
		-city;
		-pic;
		-hastly;
		List<String> -comments;
		
	match:
		-id;
		-hastly;
		-serviId;
		List<String> -users;
*/

/* GET
	$.get( "http://localhost:8080/hastler/servicioAll", function( data ) {
		  hastlerServices = data;
		  alert( "Data Loaded "  );
		});
*/

/*POST
	 var jsonString = JSON.stringify({"id": service.id, "serviceName": service.serviceName, 
		 "category": service.category, "owner": usuario.user, "cellPhone": service.cellPhone,
		 "email": service.email, "city":  service.city, "pic": service.hastly, "hastly": service.owner});
		$.ajax({

            url:"http://localhost:8080/hastler/servicio",

            type:"POST", 

            contentType: "application/json; charset=utf-8",

            data: jsonString, //Stringified Json Object

            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation

            cache: false,    //This will force requested pages not to be cached by the browser  

            processData:false, //To avoid making query String instead of JSON

            success: function(resposeJsonObject){

			}});
		hastlerServices.push(service);
*/

//var app = angular.module('starter', ['ionic']);
var urlServer = "http://localhost:8080/";

app.service('myMiddleware', function($http) {
	
	urlserver = url;

	this.x = function(x) {
        console.log(x);
        alert(x);
    }
    this.y = function() {
        console.log("Hola");
        alert("funciona!");
    }

	this.initialize = function() {
    	// No Initialization required
    	var deferred = $.Deferred();
		$http.get( "http://localhost:8080/servicioAll", function( data ) {
			hastlerServices = data;
			alert( "Data Loaded " );
		});
    	    deferred.resolve();
    	return deferred.promise();
	}

    this.obtenerPersonas = function (persona, callback){
		//persona.name = stringbusqueda;
		var personas;
		var urlthis = urlServer+"persona";
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {name:persona.name},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.obtenerPersonaEmail = function (persona, callback){
		//persona.name = stringbusqueda;
		var personaR;
		var urlthis = urlServer+"personaEmail";
		$http.get(urlthis).success(function(data){
			personaR = data;
			return personaR;
		});
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {email:persona.email},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.obtenerPersonaHastly = function (persona, callback){
		//persona.name = stringbusqueda;
		var personaR;
		var urlthis = urlServer+"personaHastly";
		$http.get(urlthis).success(function(data){
			personaR = data;
			return personaR;
		});
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {hastly:persona.hastly},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.agregarPersona = function (persona,callback){
		/*	rellenar de persona; 
			-hastly;
			-name;
			-telephone;
			-email;
			-image;*/
		var jsonString = JSON.stringify({"hastly":persona.hastly,"name":persona.name,
								"telephone":persona.telephone,"email":persona.email,
								"image":persona.image});
		var urlthis = urlServer+"persona";
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    callback(data);    
		}).error(function(data, status, headers, config) {
		    callback(data); 
		});
	}

	this.editPersona = function (persona){
		/*
			persona.id se necesita;
		*/
		var urlthis = urlServer+"editarPersona";
		var jsonString = JSON.stringify({"id":persona.id,"hastly":persona.hastly,"name":persona.name,
								"telephone":persona.telephone,"email":persona.email,
								"image":persona.image});
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	alert("exito al editar persona");
		    }else{
		    	alert("No se pudo editar persona");
		    }
		    return data; 
		}).error(function(data, status, headers, config) {
		    alert("No se pudo editar persona");
		    return data; 
		});
	}

	this.obtenerServiciosAll = function (callback){
		var servicios;
		var urlthis = urlServer+"servicioAll";
		$http.get(urlthis).success(function(data){
			servicios = data;
			return servicios;
		});
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.guardarServicio = function (servicio){
		/*	rellenar de servicio; 
			-serviceName;
			-category;
			-owner;	
			-cellPhone;
			-email;
			-city;
			-pic;
			-hastly;*/
		var jsonString = JSON.stringify({"serviceName": servicio.serviceName, 
								 "category": servicio.category, "owner": servicio.owner, "cellPhone": servicio.cellPhone,
								 "email": servicio.email, "city":  servicio.city, "pic": servicio.pic, "hastly": servicio.hastly});
		var urlthis = urlServer+"servicio";
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	alert("Servicio creado exitosamente");
		    }else{
		    	alert("El servicio no pudo ser creado");
		    }
		    return data;
		}).error(function(data, status, headers, config) {
		    alert("El servicio no pudo ser creado");
		    return data; 
		});
	}

	this.obtenerServicios = function (servicio, callback){
		//servicio.serviceName = stringbusqueda;
		var servicios;
		var urlthis = urlServer+"servicio";
		$http.get(urlthis).success(function(data){
			servicios = data;
			return servicios;
		});
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {name:servicio.name},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.borrarServicios = function (servicio){
		//servicio.id se necesita;
		var servicios;
		var urlthis = urlServer+"servicio";
		var jsonString = JSON.stringify({"id":servicio.id});
		var options = [];
		options.data = jsonString;
		$http.delete(urlthis,options).success(function(data, status, headers, config) {
		    if(data){
		    	alert("Se borro con exito el servicio");
		    }else{
		    	alert("Ocurrio un problema al borrar el servicio");
		    }
		    return data; 
		}).error(function(data, status, headers, config) {
		    alert("Ocurrio un problema al borrar el servicio");
		    return data; 
		});
	}

	this.editarServicio = function (servicio){
		/*
			servicio.id se necesita;
		*/
		var jsonString = JSON.stringify({"id":servicio.id,"serviceName": servicio.serviceName, 
								 "category": servicio.category, "owner": servicio.owner, "cellPhone": servicio.cellPhone,
								 "email": servicio.email, "city":  servicio.city, "pic": servicio.pic, "hastly": servicio.hastly});
		var urlthis = urlServer+"editarServi";
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	alert("exito al editar servicio");
		    }else{
		    	alert("No se pudo editar servicio");
		    }
		    return data;
		}).error(function(data, status, headers, config) {
		    alert("No se pudo editar servicio");
		    return data; 
		});
	} 

	this.obtenerCategoria = function (servicio, callback){
		//servicio.category se necesita;
		var servicios;
		var urlthis = urlServer+"categoria";
		$http.get(urlthis).success(function(data){
			servicios = data;
			return servicios;
		});
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {category:servicio.category},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.agregarComentario = function (servicio){
		/*
			servicio.id se necesita;
			servicio.comments[0]=commentarioAgregado;
		*/
		var jsonString = JSON.stringify({"id":servicio.id,"comments":servicio.comments});
		var urlthis = urlServer+"editarServi";

		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	alert("exito al crear comentario");
		    }else{
		    	alert("No se pudo crear comentario");
		    }
		    return data; 
		}).error(function(data, status, headers, config) {
		    alert("No se pudo crear comentario");
		    return data; 
		});
	}

	this.agregarMatch = function (match){
		/*
			rellenar de match:
			-hastly;
			-serviId;
		*/
		var jsonString = JSON.stringify({"hastly":match.hastly,"serviId":match.serviId});
		var urlthis = urlServer+"match";
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	alert("exito al agregar match");
		    }else{
		    	alert("No se pudo agregar match");
		    }
		    return data; 
		}).error(function(data, status, headers, config) {
		    alert("No se pudo agregar match");
		    return data; 
		});
	}

	this.obtenerMatch = function (match, callback){
		//match.id se necesita;
		var matchR;
		var urlthis = urlServer+"match";
		$http.get(urlthis).success(function(data){
			matchR = data;
			return matchR;
		});
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {Id:match.Id},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.obtenerMatchServiId = function (match, callback){
		//match.serviId se necesita;
		var matchesR;
		var urlthis = urlServer+"matchServi";
		$http.get(urlthis).success(function(data){
			matchesR = data;
			return matchesR;
		});
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {serviId:match.serviId},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.obtenerMatchHastly = function (match,callback){
		//match.hastly se necesita;
		var matchesR;
		var urlthis = urlServer + "matchHastly";
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {hastly:match.hastly},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});		
	}

	this.singon = function (user){
		/*
			user.password se necesita
			user.username se necesita o user.email se necesita
		*/
		var jsonString = JSON.stringify({"password":user.password,"username":user.username,"email":user.email });
		var urlthis = urlServer+"singon";
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	alert("Singon exitoso");
		    	return true;
		    }else{
		    	alert("Singon fallido");
		    	return false;
		    }
		}).error(function(data, status, headers, config) {
		    alert("Singon fallido");
		    return false; 
		});
	}

	this.login = function (user, callback){
		/*
			user.password se necesita
			user.username se necesita o user.email se necesita
		*/
		var loged;
		var urlthis = urlServer + "login";
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {password:user.password,email:user.email,username:user.username},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
		/*$http.get(urlthis,params).success(function(data){
			loged = data;
			return loged;
		});*/
	};
});