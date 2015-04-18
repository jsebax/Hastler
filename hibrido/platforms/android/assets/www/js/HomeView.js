var HomeView = function (service) {

	// Inicializa el template de la pagina de inicio
	this.initialize = function () {
		this.$el = $('<div/>');
		this.$el.on('click', '.login-btn', this.login);
	};	

	this.login = function() {
		var element = document.getElementById("ingresar");
		if ($('#userName').val() < 1) {
			element.href = '';
			alert("Por favor ingrese un nombre de usuario");
		} else {
			element.href = '#search';
			elemento = $('#userName').val();
			service.cambiarUser(elemento);
		}
	};

	// Renderiza el template
	this.render = function () {
		this.$el.html(this.template());
		return this;
	};

	this.initialize();

}