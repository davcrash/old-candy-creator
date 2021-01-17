<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="lib/jquery/jquery.min.js" type="text/javascript"></script>
        <script src="lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="lib/sweetAlert/sweetalert.min.js" type="text/javascript"></script>


        <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="lib/sweetAlert/sweetalert.css" rel="stylesheet" type="text/css"/>
        <link href="lib/sweetAlert/sweetalert.css" rel="stylesheet" type="text/css"/>
        <link href="css/cssCandylero.css" rel="stylesheet" type="text/css"/>
        <script>
            $(document).ready(function () {

                if ($("#isset").val() == "1") {

                    swal({
                        title: "Mensaje enviado",
                        text: 'Hemos recibido tu mensaje, estaremos en contacto muy pronto.',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    },
                            function () {
                                //Mostramos el dialogo de instrucciones
                                window.location.href = "index.php#contact";
                            });
                } else {

                    swal({
                        title: "Error",
                        text: "No se ha podido enviar el mensaje, intente de nuevo.",
                        timer: 900000,
                        type: "error",
                        showConfirmButton: true,
                        confirmButtonText: "OK"
                    },
                            function () {
                                //Redirigimos a la principal
                                window.location.href = "index.php#contact";
                            });
                }

            });
        </script>

    </head>
    <body>
        <?php
        if (empty($_POST)) {
            //vacio
            echo "<input id='isset' type='hidden' value='0'/>";
        } else {
            //lleno
            echo "<input id='isset' type='hidden' value='1'/>";

            //CREAMOS LOS ARCHIVOS QUE SE ENVIAN EN EL CORREO
            //
            //
            //CUERPO DEL CORREO
            $mensaje = "<b>NOMBRE:</b> " . $_POST['nombre'] . "<br>" .
                    "<b>CORREO:</b> " . $_POST['email'] . "<br>" .
                    "<b>ASUNTO:</b> " . $_POST['asunto'] . "<br>" .
                    "<b>MENSAJE:</b> " . $_POST['mensaje'] . "<br>";
    

            //VARIABLES PARA EL ENVIO DEL CORREO
            $asunto = "Contactenos: " . $_POST['asunto'];
            $correo_receptor = "pedidos@candylero.com";
            $correo_emisor = "pedidos@candylero.com";
            $clave = "pedidos123";

            //ENVIAMOS EL CORREO
            require 'lib/PHPMailer-master/PHPMailerAutoload.php';
            $mail = new PHPMailer;

            $mail->isSMTP();
            $mail->Host = 'mail.candylero.com';
            $mail->SMTPAuth = true;
            $mail->Username = $correo_emisor;
            $mail->Password = $clave;
            $mail->Port = 25;

            $mail->From = $correo_emisor;
            $mail->FromName = 'Contactenos';
            $mail->addAddress($correo_receptor);

            $mail->isHTML(true);
            $mail->addAttachment($nombre_archivo_img);
            $mail->addAttachment($nombre_archivo_json);
            $mail->Subject = $asunto;
            $mail->Body = $mensaje;
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            if (!$mail->send()) {
                echo 'El mensaje no se envio';
                echo 'Error: ' . $mail->ErrorInfo;
            }



            
            
   
        }
        ?>
    </body>
</html>
