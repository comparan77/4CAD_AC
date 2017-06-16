var PerController = function() {
    this.Init = init;

    function init() {
        initControls();
    }

    function initControls() {
        btn_registrar_click();
    }

    function scanear(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {  
                var beanPersona = new BeanPersonalQr(result.text, oUsuario.Id_bodega);
                CatalogosModel.PersonalRegistro(beanPersona, function(data) {
                    //x$('#divEstatus').removeClass('hidden');
                    //scanear();
                });
            },
            function (error) {
                Common.notificationAlert(error, 'Fallo escaneo', 'Ok');
            }
        );
    };

    function btn_registrar_click() {
        try {
            x$('#btn_registrar').on('click', function() {
                //x$('#divRegistro').addClass('hidden');
                scanear();
            });        
        } catch (error) {
            Common.notificationAlert(error, 'Error', 'Ok');
        }
    }
}