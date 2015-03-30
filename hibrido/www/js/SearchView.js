var SearchView = function (service) {

	var hastlerServiceListView;

	// Inicializa el template de la pagina de busqueda
	this.initialize = function () {
		this.$el = $('<div/>');
		this.$el.on('keyup', '.search-key', this.findByName); // Le asigna la accion a la barra de busqueda
		hastlerServiceListView = new HastlerServiceListView();		
		this.render();
	};

	// Renderiza el template
	this.render = function () {
		this.$el.html(this.template(service));
		$('.content', this.$el).html(hastlerServiceListView.$el);	
		return this;
	};

	// Encuentra un servicio por el nombre
	this.findByName = function () {
		service.findByName($('.search-key').val()).done(function(hastlerServices) {
			hastlerServiceListView.setServices(hastlerServices);
		});
	};

	this.initialize();

}