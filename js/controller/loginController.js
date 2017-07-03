var Login = function() {
    this.Init = init;

    function initControls() {
        btn_click();
    }

    function validaCredenciales(email, pass) {
        try {
            oUsuario = new BeanUsuario(email,pass);
            CatalogosModel.UsuarioCredencialesValidas(oUsuario, function (data) {
                if(data.Id > 0) {
                    oUsuario.Id = data.Id;
                    oUsuario.Nombre = data.Nombre;
                    oUsuario.Id_bodega = data.Id_bodega;
                    x$('#div_login').addClass('hidden');
                    oIndexCtrl.InitMenu();
                }
                else {
                    Common.notificationAlert('Las credenciales no son válidas', 'Login', 'Ok');
                    Common.setEstatusBtn('access', 'Login', false);
                }
            });
        } catch (error) {
            alert(error);
        }
    }

	function init() {
		initControls();
	} 

    function btn_click() {
        x$('#access').on('click', function() {
            var passValue = x$("#txt_password").attr('value');
            //passValue = 'ids150225_';
            var pass = SHA512(passValue);//llamada al archivo js 
            var email = String(x$("#txt_email").attr('value'));
            Common.setEstatusBtn('access', 'Validando', true);
            //email = 'gcruz@casc.com.mx';
            validaCredenciales(email, pass);
        });
    }
}