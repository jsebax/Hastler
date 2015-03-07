var HastlerServiceView = function (hastlerService) {

	this.initialize = function () {
		this.$el = $('<div/>');
	};

	this.render = function () {
		this.$el.html(this.template(hastlerService));
		return this;
	};

	this.initialize();

}