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
                    x$('#div_foto').removeClass('hidden');
                    x$('#img_foto').attr('src', urlHandler + 'rpt/personal/' + data.Idf + '/Foto.jpg');
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
                x$('#div_foto').addClass('hidden');
                scanear();
            });        
        } catch (error) {
            Common.notificationAlert(error, 'Error', 'Ok');
        }
    }
}