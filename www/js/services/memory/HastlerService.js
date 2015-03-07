var HastlerService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var hastlerService = null;
        var l = hastlerServices.length;
        for (var i=0; i < l; i++) {
            if (hastlerServices[i].id === id) {
                hastlerService = hastlerServices[i];
                break;
            }
        }
        deferred.resolve(hastlerService);
        return deferred.promise();
    }

    this.findByName = function(searchKey) {
        var deferred = $.Deferred();
        var results = hastlerServices.filter(function(element) {
            var service = element.serviceName;
            return service.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    }

    var hastlerServices = [
        {"id": 1, "serviceName": "Clases de guitarra", "category": "Música", "owner": "Pedro Hernández", "cellPhone": "617-000-0001", "email": "pHern@fakemail.com", "city": "Medellin", "pic": "Guitar.jpg", "hastly": "#hernanP"},
        {"id": 2, "serviceName": "Clases de cálculo", "category": "Academia", "owner": "Alejandro Carvajal", "cellPhone": "617-000-0002", "email": "aleCar@fakemail.com", "city": "Medellin", "pic": "Libros.jpg", "hastly": "#alejoC"},
        {"id": 3, "serviceName": "Clases de cocina", "category": "Cocina", "owner": "Rosa Sánchez", "cellPhone": "617-000-0003", "email": "rossanchez@fakemail.com", "city": "Medellin", "pic": "Cocina.jpg", "hastly": "#roseS"},
        {"id": 4, "serviceName": "Clases de piano", "category": "Musica", "owner": "Pablo Correa", "cellPhone": "617-000-0004", "email": "pabloC@fakemail.com", "city": "Medellin", "pic": "Piano.jpg", "hastly": "#paulC"},
        {"id": 5, "serviceName": "Clases de física", "category": "Academia", "owner": "María Ospina", "cellPhone": "617-000-0005", "email": "maryOsp@fakemail.com", "city": "Medellin", "pic": "Fisica.jpg", "hastly": "#mariaO"}
    ];

}