// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    HastlerServiceListView.prototype.template = Handlebars.compile($("#hastlerService-list-tpl").html());
    HastlerServiceView.prototype.template = Handlebars.compile($("#hastlerService-tpl").html());

    var service = new HastlerService();
    var slider = new PageSlider($('body'));
    service.initialize().done(function () {
        router.addRoute ('', function () {
            slider.slidePage(new HomeView(service).render().$el);
        });

        router.addRoute('services/:id', function(id) {
            service.findById(parseInt(id)).done(function(hastlerService) {
                slider.slidePage(new HastlerServiceView(hastlerService).render().$el);
            });
        });

        router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Hastler", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */

}());