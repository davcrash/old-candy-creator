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
                    //<b>' + $("#nombreEnvia").val() + '</b>, tu pedido <b>(' + $("#num_orden").val() + ')</b>, se recibio correctamente, por favor toma nota del codigo y sigue las siguientes intrucciones para que te lo podamos enviar.<br>
                    //en la cuenta <b>XXXXXXXXXXXXXX</b>, nosotros entregamos los pedidos despues de 48 horas posteriores a la consignacion, por lo cual si tu consignas 48 horas antes del <b>' + $("#fecha").val() + '</b> podremos entregar tu pedido en la fecha que escogiste. <br><br><b>Paso 2:</b><br>Tomale una foto al comprobante de la consignacion y enviala al Whatsapp <b>31232232323</b>, te daremos una respuesta de cuando recibiras tu pedido.
                    swal({//en la cuenta <b>XXXXXXXXXXXXXX</b>, nosotros entregamos los pedidos despues de 48 horas posteriores a la consignacion, por lo cual si tu consignas 48 horas antes del <b>' + $("#fecha").val() + '</b> podremos entregar tu pedido en la fecha que escogiste. <br><br><b>Paso 2:</b><br>Tomale una foto al comprobante de la consignacion y enviala al Whatsapp <b>31232232323</b>, te daremos una respuesta de cuando recibiras tu pedido.
                        title: "¡Pedido Recibido!",
                        text: '<p style="text-align: justify;">Hemos recibido el diseño de tu ChoCard. Solo te restan dos pasos para finalizar tu compra.<br><b>Paso 1:</b><br>Nos debes hacer llegar <b>($ ' + $("#totalHidden").val() + ')</b> vía Bancolombia o Efecty. Recuerda que tú asumes el valor de la transacción, nosotros te regalamos el envío en Bogotá.<br><br>Para pago por Bancolombia:<br>Cuenta de Ahorros de Bancolombia No. 325-4675-8774 Titular de la cuenta: Juan Sebastián Monroy Moreno.<br>Pago Vía Baloto-Efecty a nombre de Juan Sebastián Monroy Moreno con número de cédula 1.016.062.078.<br><br><b>Paso 2:</b><br>Envíanos una foto vía WhatsApp del comprobante de pago con el número de referencia de tu ChoCard <b>no.' + $("#num_orden").val() + '</b> al número celular <b>311-2998003</b>. Es todo, tan pronto lo hagas te haremos la confirmación de recepción y envío de tu ChoCard.<br><br><b>¡Gracias por confiar en Candylero!</b><br>Mayor información: contacto@candylero.com ó al Celular 311-2998003.</p>',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "¡Entendido!",
                        closeOnConfirm: true,
                        html: true
                    },
                            function () {
                                //Mostramos el dialogo de instrucciones
                                window.location.href = "index.php";
                            });
                } else {

                    swal({
                        title: "Pedido incorrecto",
                        text: "No se recibio ningun pedido.",
                        timer: 900000,
                        type: "error",
                        showConfirmButton: true,
                        confirmButtonText: "OK"
                    },
                            function () {
                                //Redirigimos a la principal
                                window.location.href = "index.php";
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
            $mensaje = "<b>NUMERO ORDEN:</b> " . $_POST['num_orden'] . "<br>" .
                    "<b>DE:</b> " . $_POST['nombreEnvia'] . "<br>" .
                    "<b>PARA:</b> " . $_POST['nombreRecibe'] . "<br>" .
                    "<b>FECHA ENTREGA:</b> " . $_POST['fecha'] . "<br>" .
                    "<b>BARRIO:</b> " . $_POST['barrio'] . "<br>" .
                    "<b>DIRECCION:</b> " . $_POST['direccion'] . "<br>" .
                    "<b>TELEFONO:</b> " . $_POST['telefono'] . "<br>" .
                    "<b>TIPO CHOCOLATE:</b> " . $_POST['tipoChocolate'] . "<br>" .
                    "<b>POLVO DORADO:</b> " . $_POST['polvoDorado'] . "<br>" .
                    "<b>CANTIDAD:</b> " . $_POST['cantidad'] . "<br>" .
                    "<b>TOTAL:</b> " . $_POST['totalHidden'] . "<br>";

            //IMAGEN
            $nombre_archivo_img = "./archivos/img_" . $_POST['num_orden'] . ".txt";
            $archivo = fopen($nombre_archivo_img, "a");
            fwrite($archivo, $_POST['imagen']);
            fclose($archivo);

            //JSON
            $nombre_archivo_json = "./archivos/json_" . $_POST['num_orden'] . ".txt";
            $archivo = fopen($nombre_archivo_json, "a");
            fwrite($archivo, $_POST['json']);
            fclose($archivo);

            //JSON
            $nombre_archivo_respaldo = "./archivos/datos_" . $_POST['num_orden'] . ".txt";
            $archivo = fopen($nombre_archivo_respaldo, "a");
            fwrite($archivo, $mensaje);
            fclose($archivo);



            //VARIABLES PARA EL ENVIO DEL CORREO
            $asunto = "pedido: " . $_POST['num_orden'];
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
            $mail->FromName = 'Pedidos web';
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
            } else {
                unlink($nombre_archivo_img);
                unlink($nombre_archivo_json);
                unlink($nombre_archivo_respaldo);
            }



            //Datos del pedido
            echo '<input id="cantidad" type="hidden" value="' . $_POST['cantidad'] . '"/><br>';
            echo '<input id="nombreEnvia" type="hidden" value="' . $_POST['nombreEnvia'] . '"/><br>';
            echo '<input id="nombreRecibe" type="hidden" value="' . $_POST['nombreRecibe'] . '"/><br>';
            echo '<input id="fecha" type="hidden" value="' . $_POST['fecha'] . '"/><br>';
            echo '<input id="barrio" type="hidden" value="' . $_POST['barrio'] . '"/><br>';
            echo '<input id="direccion" type="hidden" value="' . $_POST['direccion'] . '"/><br>';
            echo '<input id="telefono" type="hidden" value="' . $_POST['telefono'] . '"/><br>';
            echo '<input id="totalHidden" type="hidden" value="' . $_POST['totalHidden'] . '"/><br>';
            echo '<input id="json" type="hidden" value="' . $_POST['json'] . '"/><br>';
            echo '<input id="num_orden" type="hidden" value="' . $_POST['num_orden'] . '"/><br>';
            echo '<input id="imagen" type="hidden" value="' . $_POST['imagen'] . '"/><br>';
            echo '<input id="polvoDorado" type="hidden" value="' . $_POST['polvoDorado'] . '"/><br>';
            echo '<input id="tipoChocolate" type="hidden" value="' . $_POST['tipoChocolate'] . '"/><br>';
        }
        ?>
    </body>
</html>
