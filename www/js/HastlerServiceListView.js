var HastlerServiceListView = function () {

	var hastlerServices;

	this.initialize = function () {
		this.$el = $('<div/>');
		this.render();
	};

	this.setServices = function (list) {
		hastlerServices = list;
		this.render();
	};

	this.render = function () {
		this.$el.html(this.template(hastlerServices));
		return this;
	};

	this.initialize();

}