var urlServer="http://52.25.8.145:8080/";

app.service('myMiddleware', function() {
    this.x = function() {
        console.log("Hola");
        alert("Hi!");
    }
});