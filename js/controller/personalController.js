var Personal = function() {
    this.Init = init;

    function init() {
        try {
            x$('#divRegistro').addClass('hidden');
            scanear();            
        } catch (error) {
            Common.notificationAlert(error, 'Error', 'Ok');
        }
    }

    function scanear(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {  
                var beanPersona = new BeanPersonalQr(result.text, id_bodega);
                CatalogosModel.PersonalRegistro(beanPersona, function(data) {
                    x$('#divEstatus').removeClass('hidden');
                    scanear();
                });
            },
            function (error) {
                Common.notificationAlert(error, 'Fallo escaneo', 'Ok');
            }
        );
    };
}