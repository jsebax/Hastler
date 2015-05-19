var AddServiceView = function (service) {

    // Inicializa el AddServiceView
	this.initialize = function () {
		this.$el = $('<div/>');
		this.$el.on('click', '.add-service-btn', this.addService);		
	};

    // Funcion que se llama cuando se presiona el boton agregar

	this.addService = function () {
		if ($('#serviceName').val() < 1 || $('#category').val() < 1 || $('#owner').val() < 1 || $('#cellPhone').val() < 1
            || $('#email').val() < 1 || $('#city').val() < 1 || $('#hastly').val() < 1) {
            alert("Todos los campos son obligatorios");
        } else {
        	servicios = service.getServices();
            var tamanio = service.tamanio() + 1;
            var hService = {"id": tamanio, 
                            "serviceName": $('#serviceName').val(), 
                            "category": $('#category').val(), 
                            "owner": $('#owner').val(),
                            "cellPhone": $('#cellPhone').val(),
                            "email": $('#email').val(),
                            "city": $('#city').val(),
                            "pic": "imagenDefecto.jpg",
                            "hastly": $('#hastly').val()};
            service.addService(hService);

            //mensaje
            alert("Su servicio a sido agregado");

            //limpiar campos
            $('#serviceName').val('');
            $('#category').val('');
            $('#owner').val('');
            $('#cellPhone').val('');
            $('#email').val('');
            $('#city').val('');
            $('#hastly').val('');
        }
	};

    // Renderiza el template

	this.render = function () {
		this.$el.html(this.template());
		return this;
	};

	this.initialize();
    
}