function CatalogosModel() {}

/**Registro personal */
CatalogosModel.PersonalRegistro = function (obj, callback) {
    var url = urlHandler + 'handlers/AccesoPersonal.ashx?op=personal&opt=Registro';
    try {
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            }, 
            'POST',
            JSON.stringify(obj));
    } catch (error) {
        alert('PersonalRegistroErr: ' + error);
    }
}