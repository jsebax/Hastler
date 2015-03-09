var HastlerServiceListView = function () {

	var hastlerServices;

	// Inicializa el template
	this.initialize = function () {
		this.$el = $('<div/>');
		this.render();
	};

	// Muestra una lista de servicios dada
	this.setServices = function (list) {
		hastlerServices = list;
		this.render();
	};

	// Renderiza el template
	this.render = function () {
		this.$el.html(this.template(hastlerServices));
		return this;
	};

	this.initialize();

}