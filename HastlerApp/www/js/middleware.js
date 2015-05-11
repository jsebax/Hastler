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

var urlServer="http://localhost:8080/hastler/";

function obtenerPersonas(persona){
	//persona.name = stringbusqueda;
	var personas;
	var ulrthis = urlServer+"persona";
	$.get(ulrthis,function(data){
		personas = data;
	});
}

function obtenerPersonaEmail(persona){
	//persona.name = stringbusqueda;
	var personaR;
	var ulrthis = urlServer+"personaEmail";
	$.get(ulrthis,function(data){
		personaR = data;
	});
}

function obtenerPersonaHastly(persona){
	//persona.name = stringbusqueda;
	var personaR;
	var ulrthis = urlServer+"personaHastly";
	$.get(ulrthis,function(data){
		personaR = data;
	});
}

function agregarPersona(persona){
	/*	rellenar de persona; 
		-hastly;
		-name;
		-telephone;
		-email;
		-image;*/
	var jsonString = JSON.stringify({"hastly":persona.hastly,"name":persona.name,
							"telephone":persona.telephone,"email":persona.email,
							"image":persona.image});
	var ulrthis = urlServer+"persona";
	$.ajax({
            url:ulrthis,
            type:"POST", 
            contentType: "application/json; charset=utf-8",
            data: jsonString, //Stringified Json Object
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser  
            processData:false, //To avoid making query String instead of JSON
            success: function(resposeJsonObject){
				if(responseJsonObject){
					alert("exito al agregar persona");
				}
			}});
}

function editPersona(persona){
	/*
		persona.id se necesita;
	*/
	var ulrthis = urlServer+"editarPersona";
	var jsonString = JSON.stringify({"id":persona.id,"hastly":persona.hastly,"name":persona.name,
							"telephone":persona.telephone,"email":persona.email,
							"image":persona.image});
	$.ajax({
            url:ulrthis,
            type:"POST", 
            contentType: "application/json; charset=utf-8",
            data: jsonString, //Stringified Json Object
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser  
            processData:false, //To avoid making query String instead of JSON
            success: function(resposeJsonObject){
				if(responseJsonObject){
					alert("exito al editar persona");
				}
			}});
}

function obtenerServiciosAll(){
	var servicios;
	var ulrthis = urlServer+"servicioAll";
	$.get(ulrthis,function(data){
		servicios = data;
	});
}

function guardarServicio(servicio){
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
	var ulrthis = urlServer+"servicio";
	$.ajax({
            url:ulrthis,
            type:"POST", 
            contentType: "application/json; charset=utf-8",
            data: jsonString, //Stringified Json Object
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser  
            processData:false, //To avoid making query String instead of JSON
            success: function(resposeJsonObject){
				if(responseJsonObject){
					alert("exito al agregar servicio");
				}
			}});
}

function obtenerServicios(servicio){
	//servicio.serviceName = stringbusqueda;
	var servicios;
	var ulrthis = urlServer+"servicio";
	$.get(ulrthis,function(data){
		servicios = data;
	});
}

function borrarServicios(servicio){
	//servicio.id se necesita;
	var servicios;
	var ulrthis = urlServer+"servicio";
	var jsonString = JSON.stringify({"id":servicio.id});
	$.ajax({
		type: "DELETE",
		url: ulrthis,
		data: jsonString,
		success: function(data){
			if(data){
				alert("exito al borrar el servicio");
			}
		}
	});
}

function editarServicio(servicio){
	/*
		servicio.id se necesita;
	*/
	var jsonString = JSON.stringify({"id":servicio.id,"serviceName": servicio.serviceName, 
							 "category": servicio.category, "owner": servicio.owner, "cellPhone": servicio.cellPhone,
							 "email": servicio.email, "city":  servicio.city, "pic": servicio.pic, "hastly": servicio.hastly});
	var ulrthis = urlServer+"editarServi";
	$.ajax({
            url:ulrthis,
            type:"POST", 
            contentType: "application/json; charset=utf-8",
            data: jsonString, //Stringified Json Object
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser  
            processData:false, //To avoid making query String instead of JSON
            success: function(resposeJsonObject){
				if(responseJsonObject){
					alert("exito al editar servicio");
				}
			}});
} 

function obtenerCategoria(servicio){
	//servicio.category se necesita;
	var servicios;
	var ulrthis = urlServer+"categoria";
	$.get(ulrthis,function(data){
		servicios = data;
	});
}

function agregarComentario(servicio){
	/*
		servicio.id se necesita;
		servicio.comments[0]=commentarioAgregado;
	*/
	var jsonString = JSON.stringify({"id":servicio.id,"comments":servicio.comments});
	var ulrthis = urlServer+"editarServi";
	$.ajax({
            url:ulrthis,
            type:"POST", 
            contentType: "application/json; charset=utf-8",
            data: jsonString, //Stringified Json Object
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser  
            processData:false, //To avoid making query String instead of JSON
            success: function(resposeJsonObject){
				if(responseJsonObject){
					alert("exito al agregar comentario");
				}
			}});
}

function agregarMatch(match){
	/*
		rellenar de match:
		-hastly;
		-serviId;
	*/
	var jsonString = JSON.stringify({"hastly":match.hastly,"serviId":match.serviId});
	var ulrthis = urlServer+"match";
	$.ajax({
            url:ulrthis,
            type:"POST", 
            contentType: "application/json; charset=utf-8",
            data: jsonString, //Stringified Json Object
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser  
            processData:false, //To avoid making query String instead of JSON
            success: function(resposeJsonObject){
				if(responseJsonObject){
					alert("exito al agregar match");
				}
			}});
}

function obtenerMatch(match){
	//match.id se necesita;
	var matchR;
	var ulrthis = urlServer+"match";
	$.get(ulrthis,function(data){
		matchR = data;
	});
}

function obtenerMatchServiId(match){
	//match.serviId se necesita;
	var matchesR;
	var ulrthis = urlServer+"matchServi";
	$.get(ulrthis,function(data){
		matchesR = data;
	});
}

function obtenerMatchHastly(match){
	//match.hastly se necesita;
	var matchesR;
	var ulrthis = urlServer+"matchHastly";
	$.get(ulrthis,function(data){
		matchesR = data;
	});
}

function login(user){
	/*
		user.password se necesita
		user.username se necesita o user.email se necesita
	*/
	var loged;
	var ulrthis = urlServer+"login";
	$.get(ulrthis,function(data){
		loged=data;
	}
}

function singon(user){
	/*
		user.password se necesita
		user.username se necesita o user.email se necesita
	*/
	var jsonString = JSON.stringify({"password":user.password,"username":user.username,"email":user.email });
	var ulrthis = urlServer+"singon";
	$.ajax({
            url:ulrthis,
            type:"POST", 
            contentType: "application/json; charset=utf-8",
            data: jsonString, //Stringified Json Object
            async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
            cache: false,    //This will force requested pages not to be cached by the browser  
            processData:false, //To avoid making query String instead of JSON
            success: function(resposeJsonObject){
				if(responseJsonObject){
					alert("exito al registrarse");
					login(user);
				}
			}});
}