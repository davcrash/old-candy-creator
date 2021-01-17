
<?php

function TraerPlantillas($urlJSON, $urlPNG) {


    //Capturamos los archivos
    $directorioJSON = $urlJSON;
    $directorioPNG = $urlPNG;

    $ficherosJSON = scandir($directorioJSON);
    $ficherosPNG = scandir($directorioPNG);

    //Pintamos las plantillas
    foreach ($ficherosPNG as $valuePNG) {
        //Miramos cual es el JSON de la plantilla
        foreach ($ficherosJSON as $valueJSON) {

            if ($valueJSON == "." || $valueJSON == "..") {
                
            } else {
                $nameJSON = basename($urlJSON . $valueJSON, ".txt") . PHP_EOL;
                $namePNG = basename($urlPNG . $valuePNG, ".png") . PHP_EOL;

                if ($nameJSON == $namePNG) {

                    $archivoJSON = fopen($urlJSON . $valueJSON, "r");
                    $contenidoJSON = utf8_encode(fgets($archivoJSON));
                    fclose($archivoJSON);
                    echo "
      <a style=\"text-align: center; width: 35vmin; height: 19vmin;\" href=\"#\" data-json='" . utf8_decode($contenidoJSON) . "' onclick=\"escogerPlantilla(this)\">
      <div align=\"center\">
      <img class=\"img-responsive cambiacolor\" src=\"" . $urlPNG . $valuePNG . "\"  style=\"width: 32vmin; height: 16vmin; border: 2px solid rgba(0,0,0, .5); border-radius:2%\"  >
      </div>
      </a>";
                }
            }
        }
    }
}
