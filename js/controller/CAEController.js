var CAEController = function() {
    this.Create = create;

    function create(type){
        var obj;
        try {
            if (type === "login") {
                obj = new Login();
            } else if (type === "inicio") {
                obj = new Inicio();
            } else if (type === "qrread") {
                obj = new PerController();
            }
            x$('#div_' + type).xhr('./' + type + '.html', {
                async: true,
                callback: function() { 
                    x$('#div_' + type).html(this.responseText);
                    obj.Init();
                },
            });
        } catch (error) {
            console.log(error);
        }
        
    }
}