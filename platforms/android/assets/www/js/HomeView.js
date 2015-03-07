var HomeView = function (service) {

	var hastlerServiceListView;

	this.initialize = function () {
		this.$el = $('<div/>');
		this.$el.on('keyup', '.search-key', this.findByName);
		hastlerServiceListView = new HastlerServiceListView();
		this.render();
	};

	this.render = function () {
		this.$el.html(this.template());
		$('.content', this.$el).html(hastlerServiceListView.$el);
		return this;
	};

	this.findByName = function () {
		service.findByName($('.search-key').val()).done(function(hastlerServices) {
			hastlerServiceListView.setServices(hastlerServices);
		});
	};

	this.initialize();

}