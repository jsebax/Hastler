//Popup ionic, por que el celular no muestra los alert se debe usar este 

$ionicPopup.show({
    title: 'Changes Saved Successfully',
    buttons: [{
        text: 'OK',
        type: 'button-positive',
        onTap: function() {
            $location.path("/tab/myProfile");
        }
    }]
});