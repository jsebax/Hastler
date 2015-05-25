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
		-emailUser;
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
var urlServer = "http://52.25.8.145:8080/";

app.service('myMiddleware', function($http) {

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
								"image":persona.image, "lastName":persona.lastName});
		var urlthis = urlServer+"persona";
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    callback(data);    
		}).error(function(data, status, headers, config) {
		    callback(data); 
		});
	}

	this.editPersona = function (persona, callback){
		/*
			persona.id se necesita;
		*/
		var urlthis = urlServer+"editarPersona";
		var jsonString = JSON.stringify({"id":persona.id,"hastly":persona.hastly,"name":persona.name,
								"telephone":persona.telephone,"email":persona.email,
								"image":persona.image, "lastName":persona.lastName});
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	console.log("exito al editar persona");
		    }else{
		    	console.log("No se pudo editar persona "+data);
		    }
		    callback(data); 
		}).error(function(data, status, headers, config) {
		    console.log("No se pudo editar persona");
		    callback(data); 
		});
	}

	this.obtenerServiciosAll = function (callback){
		var servicios;
		var urlthis = urlServer+"servicioAll";

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

	this.guardarServicio = function (servicio,callback){
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
		    	console.log("Servicio creado exitosamente");
		    }else{
		    	console.log("El servicio no pudo ser creado");
		    }
		    callback(data);
		}).error(function(data, status, headers, config) {
		    console.log("El servicio no pudo ser creado");
		    callback(false); 
		});
	}

	this.obtenerServicios = function (servicio, callback){
		//servicio.serviceName = stringbusqueda;
		var servicios;
		var urlthis = urlServer+"servicio";

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

	this.obtenerServiciosEmail = function (servicio, callback){
		//servicio.email = stringbusqueda;
		var servicios;
		var urlthis = urlServer+"servicioEmail";

		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {email:servicio.email},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.obtenerServiciosId = function (servicio, callback){
		//servicio.id = stringbusqueda;
		var servicios;
		var urlthis = urlServer+"servicioId";

		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {id:servicio.id},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.borrarServicios = function (servicio, callback){
		//servicio.id se necesita;
		var urlthis = urlServer+"servicio";
		$http({
		    url: urlthis, 
		    method: 'delete',
		    params: {Id:servicio.id},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});
	}

	this.editarServicio = function (servicio, callback){
		/*
			servicio.id se necesita;
		*/
		var jsonString = JSON.stringify({"id":servicio.id,"serviceName": servicio.serviceName, 
								 "category": servicio.category, "owner": servicio.owner, "cellPhone": servicio.cellPhone,
								 "email": servicio.email, "city":  servicio.city, "pic": servicio.pic, "hastly": servicio.hastly});
		var urlthis = urlServer+"editarServi";
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	console.log("exito al editar servicio");
		    }else{
		    	console.log("No se pudo editar servicio");
		    }
		    callback(data);
		}).error(function(data, status, headers, config) {
		    console.log("No se pudo editar servicio");
		    callback(false); 
		});
	} 

	this.obtenerCategoria = function (servicio, callback){
		//servicio.category se necesita;
		var servicios;
		var urlthis = urlServer+"categoria";

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

	this.agregarComentario = function (id, content, rate, callback){
		/*
			servicio.id se necesita;
			servicio.comments[0]=commentarioAgregado;
		*/
		var jsonString = JSON.stringify({"id":id,
			"comments":[{"email":window.localStorage['email'],
						"content":content,"calification":rate}]});
		console.log("enviare: "+ jsonString);
		var urlthis = urlServer+"comentario";

		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	console.log("exito al crear comentario");
		    }else{
		    	console.log("No se pudo crear comentario");
		    }
		    callback(data); 
		}).error(function(data, status, headers, config) {
		    console.log("No se pudo crear comentario");
		    callback(false);
		});
	}

	this.agregarMatch = function (match, callback){
		/*
			rellenar de match:
			-emailUser;
			-serviId;
		*/
		var urlthis = urlServer+"match";
		var jsonString = JSON.stringify({"serviId":match.serviId,"emailUser":match.emailUser});
		$http.post(urlthis,jsonString).success(function(data, status, headers, config) {
		    if(data){
		    	console.log("exito al agregar match");
		    }else{
		    	console.log("No se pudo agregar match");
		    }
		    callback(data);
		}).error(function(data, status, headers, config) {
		    console.log("No se pudo agregar match");
		    callback(false);
		});
	}

	this.obtenerMatch = function (match, callback){
		//match.id se necesita;
		var matchR;
		var urlthis = urlServer+"match";

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

	this.obtenerMatchUser = function (match,callback){
		//match.emailUser se necesita;
		var matchesR;
		var urlthis = urlServer + "matchUser";
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {email:match.emailUser},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
		});		
	}

	this.borrarMatch = function (match,callback){
		//match.emailUser se necesita;
		var matchesR;
		var urlthis = urlServer + "match";
		$http({
		    url: urlthis, 
		    method: 'delete',
		    params: {id:match.id},
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
		    	console.log("Singon exitoso");
		    	return true;
		    }else{
		    	console.log("Singon fallido");
		    	return false;
		    }
		}).error(function(data, status, headers, config) {
		    console.log("Singon fallido");
		    return false; 
		});
	}

	this.emailCheck = function (user, callback){
		/*
			user.password se necesita
			user.username se necesita o user.email se necesita
		*/
		var loged;
		var urlthis = urlServer + "emailCheck";
		$http({
		    url: urlthis, 
		    method: 'GET',
		    params: {email:user.email},
		}).success(function(data, status, headers, config){
		    callback(data);
		}).error(function(data, status, headers, config){
		    callback(false);
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
	};
});