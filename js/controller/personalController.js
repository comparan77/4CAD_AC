var v_idf;
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
                    if(typeof(data)=='object') {
                        x$('#p_mensaje').html(data.Mensaje);
                        
                        x$('#img_foto').attr('src', urlHandler + 'rpt/personal/' + data.Idf + '/Foto.jpg');
                        x$('#div_foto').removeClass('hidden');
                        // try {
                        //     v_idf = data.Idf;
                        //     checkIfFileExists('perfoto/' + v_idf + ".jpg");
                        //     //DownloadFile( urlHandler + 'rpt/personal/' + data.Idf + '/Foto.jpg', 'perfoto', data.Idf);    
                        // } catch (error) {
                        //     alert(error);
                        // }
                        
                        if(data.PPerReg==null)
                            x$('#p_mensaje').addClass('error');
                        }
                    else {
                        x$('#p_mensaje').addClass('error');
                        x$('#p_mensaje').html(data);
                    }
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
            v_idf = '';
            x$('#btn_registrar').on('click', function() {
                x$('#p_mensaje').html('');
                x$('#p_mensaje').removeClass('error');
                x$('#div_foto').addClass('hidden');
                scanear();
            });        
        } catch (error) {
            Common.notificationAlert(error, 'Error', 'Ok');
        }
    }

    function DownloadFile(URL, Folder_Name, File_Name) {
        //Parameters mismatch check
        if (URL == null && Folder_Name == null && File_Name == null) {
            return;
        }
        else {
            //checking Internet connection availablity
            var networkState = navigator.connection.type;
            if (networkState == Connection.NONE) {
                return;
            } else {
                download(URL, Folder_Name, File_Name); //If available download function call
            }
        }
    }

    function download(URL, Folder_Name, File_Name) {
        //step to request a file system 
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
        
        function fileSystemSuccess(fileSystem) {
            var download_link = encodeURI(URL);
            ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL
            
            var directoryEntry = fileSystem.root; // to get root path of directory
            directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
            var rootdir = fileSystem.root;
            var fp = rootdir.fullPath; // Returns Fulpath of local directory
            
            fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
            //fp = 'data/data/com.adobe.phonegap.app/files/files/perfoto/' + File_Name + "." + ext;
            fp = 'data/data/com.phonegap.helloworld/files/files/perfoto/' + File_Name + "." + ext;
            // download function call
            filetransfer(download_link, fp);
        }

        function onDirectorySuccess(parent) {
            // Directory created successfuly
            console.log(parent.fullPath);
        }

        function onDirectoryFail(error) {
            //Error while creating directory
            alert("Unable to create new directory: " + error.code);
        }

        function fileSystemFail(evt) {
            //Unable to access file system
            alert(evt.target.error.code);
        }
    }

    function filetransfer(download_link, fp) {
    var fileTransfer = new FileTransfer();
    // File download function with URL and local path
    fileTransfer.download(download_link, fp,
                        function (entry) {
                            // alert("download complete: " + entry.fullPath);
                        },
                    function (error) {
                        //Download abort errors or download failed errors
                        alert("download error source " + error.target);
                        //alert("download error target " + error.target);
                        //alert("upload error code" + error.code);
                    }
                );
    }


    function checkIfFileExists(path) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(path, { create: false }, fileExists, fileDoesNotExist);
        }, getFSFail); //of requestFileSystem
    }
    function fileExists(fileEntry){
        //alert("File " + fileEntry.fullPath + " exists!");
        //console.log('file://data/data/com.adobe.phonegap.app/files/files' + fileEntry.fullPath);
        //x$('#img_foto').attr('src', 'file:///data/data/com.adobe.phonegap.app/files/files' + fileEntry.fullPath);
        x$('#img_foto').attr('src', 'file:///data/data/com.phonegap.helloworld/files/files' + fileEntry.fullPath);
        x$('#div_foto').removeClass('hidden');
    }
    function fileDoesNotExist(){
        x$('#img_foto').attr('src', urlHandler + 'rpt/personal/' + v_idf + '/Foto.jpg');   
        x$('#div_foto').removeClass('hidden');
        DownloadFile( urlHandler + 'rpt/personal/' + v_idf + '/Foto.jpg', 'perfoto', v_idf);
    }
    function getFSFail(evt) {
        console.log(evt.target.error.code);
    }

}