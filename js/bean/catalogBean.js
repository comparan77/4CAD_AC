//**Usuario */
var BeanUsuario = function(email, contrasenia) {
    this.Id = 0;
    this.Nombre = '';
    this.Clave = '';
    this.Email = email;
    this.Contrasenia = contrasenia;
    this.Id_bodega = 0;
    this.Id_rol = 0;
    this.IsActive = 0;
};

var BeanPersonalQr = function(idf, id_bodega) {
    this.Id = 0;
    this.Idf = idf;
    this.Id_personal = 0;
    this.Id_bodega = id_bodega;
}