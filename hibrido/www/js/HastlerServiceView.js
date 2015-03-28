var HastlerServiceView = function (hastlerService) {

	// Inicializa el template de un servicio especifico
	this.initialize = function () {
		this.$el = $('<div/>');
	};

	// Renderiza el template del servicio especifico
	this.render = function () {
		this.$el.html(this.template(hastlerService));
		return this;
	};

	this.initialize();

}