var flagPolvoDorado = 0;
var myDataURL = "";

$(document).ready(function () {
  if (document.URL.indexOf("#") == -1) {
    // Set the URL to whatever it was plus "#".
    url = document.URL + "#";
    location = "#";

    //Reload the page
    location.reload(true);
  }

  $("#diseños").hide();
  $("#emojis").hide();

  $("#switchBtn").bootstrapToggle({
    on: "Si",
    off: "No",
  });

  $("#switchBtn").change(function () {
    if ($("#loadereditor").is(":visible")) {
      MostrarAlerta(
        "Opps...",
        "¡Debes Seleccionar el tipo de Chocolate deseado!",
        "error",
        "¡Entendido!"
      );
      //            $('#switchBtn').prop('checked', false); toggle btn btn-default off
      $("#switchBtn")
        .parent()
        .removeClass("toggle btn btn-warning")
        .addClass("toggle btn btn-default off");
      $("#switchBtn").prop("checked", false);
    } else {
      if ($("#switchBtn").prop("checked")) {
        $("#polvoDorado").val("si");
        $("#labelDorado").show();
        flagPolvoDorado = 1;
        $("#total").val(CalcularTotal());
        //cambiamos fondo a dorado

        cambiarColor();
      } else {
        $("#polvoDorado").val("no");
        $("#labelDorado").hide();
        flagPolvoDorado = 0;
        $("#total").val(CalcularTotal());

        cambiarColor();
      }
    }
  });
});

function cambiarColor() {
  myDataURL = chocolateEscogido;
  if (flagPolvoDorado == 0) {
    var img = new Image();
    img.width = $("#divContenedorChocolate").width();
    img.height = $("#divContenedorChocolate").height();
    img.onload = function () {
      var f_img = new fabric.Image(img);
      canvas.setBackgroundImage(f_img);
      canvas.renderAll();
    };
    img.src = myDataURL;
    $("#total").val(CalcularTotal());
  } else {
    if (chocolateEscogido === "img/choco_negro.jpg") {
      myDataURL = "img/gold_negro.jpg";
    } else if (chocolateEscogido === "img/choco_blanco.jpg") {
      myDataURL = "img/gold_blanco.jpg";
    } else if (chocolateEscogido === "img/choco_dietetico.jpg") {
      myDataURL = "img/gold_dietetico.jpg";
    }

    var img = new Image();
    img.width = $("#divContenedorChocolate").width();
    img.height = $("#divContenedorChocolate").height();
    img.onload = function () {
      var f_img = new fabric.Image(img);
      canvas.setBackgroundImage(f_img);
      canvas.renderAll();
    };
    img.src = myDataURL;
    $("#total").val(CalcularTotal());
  }
}

function MostrarAlerta(titulo, texto, tipo, txtButton) {
  swal({
    title: titulo,
    text: texto,
    type: tipo,
    confirmButtonText: txtButton,
  });
}

function escogerChocolate(chocolate) {
  $("#loadereditor").hide();
  $("#c").show();

  var myDataURL = chocolate.getAttribute("data-url");
  this.chocolateEscogido = myDataURL;
  cambiarColor();
}

function escogerPlantilla(plantilla) {
  canvas.clear();
  canvas.renderAll();
  canvas.renderAll();
  var myDataJSON = plantilla.getAttribute("data-json");
  //    canvas.loadFromJSON(myDataJSON);
  //    canvas.renderAll();
  canvas.loadFromJSON(myDataJSON);
  cambiarColor();
  canvas.renderAll();

  //Capturamos el tamaÃ±o del canvas
  var anchoCanvas = $("#divContenedorChocolate").width();
  var largoCanvas = $("#divContenedorChocolate").height();

  var intervalo = setInterval(function () {
    var intervalo2 = setInterval(function () {
      canvas.renderAll();

      canvas.forEachObject(function (obj) {
        AjustarObjeto(obj);
        canvas.renderAll();
      });
      clearInterval(intervalo2);
    }, 1);

    cambiarColor();
    cambiarColor();
    cambiarColor();
    canvas.renderAll();

    canvas.forEachObject(function (obj) {
      obj.minScaleLimit = $("#minScale").val();
      canvas.renderAll();
    });

    $("#next").trigger("click");
    clearInterval(intervalo);
  }, 1);
}

function AjustarObjeto(obj) {
  canvas.renderAll();

  //Ajustamos la coordenada X del objeto
  obj.left = ($("#divContenedorChocolate").width() * obj.getLeft()) / 576;

  //Ajustamos la coordenada Y delobjeto
  obj.top = ($("#divContenedorChocolate").height() * obj.getTop()) / 288;

  //Ajustamos el width del objeto
  widthFinal = obj.scaleX =
    ($("#divContenedorChocolate").width() * obj.getWidth()) / 576;

  //Ajustamos el height del objeto
  heightFinal = obj.scaleY =
    ($("#divContenedorChocolate").height() * obj.getHeight()) / 288;

  divisorScaleX = obj.getWidth() / widthFinal;
  divisorScaleY = obj.getHeight() / heightFinal;
  var wd = obj.getWidth() / divisorScaleX;
  var hd = obj.getHeight() / divisorScaleY;
  obj.scaleX = wd / divisorScaleX;
  obj.scaleY = hd / divisorScaleY;

  cambiarColor();
  obj.setCoords();
  canvas.renderAll();
}

function SeleccionarCategoria() {
  $("#AmorAmistad").hide();
  $("#Aniversario").hide();
  $("#Cumpleanios").hide();
  $("#DiaMadre").hide();
  $("#DiaPadre").hide();
  $("#Otros").hide();
  $("#" + $("#categoria option:selected").val()).show();
}

function BtnInfo() {
  //Abrimos alerta de tutorial
  swal(
    {
      title: "Video tutorial",
      text:
        '<iframe id="videotuto" style="width: 100%; height: 40vmin; " src="https://www.youtube.com/embed/FvzwSFCTcZw" frameborder="0" allowfullscreen></iframe>',
      confirmButtonText: "OK",
      closeOnConfirm: true,
      html: true,
    },
    function () {
      $("#videotuto").attr("src", $("#videotuto").attr("src"));
    }
  );
}

function BtnSiguiente() {
  var iconElement = document.getElementById("flechaSiguiente");
  var options = {
    from: "fa-arrow-rigth",
    to: "fa-arrow-rigth",
    animation: "rubberBand",
  };
  if ($("#color").is(":visible")) {
    if ($("#c").is(":visible")) {
      //Mostramos los emojis
      $("#color").hide();
      $("#emojis").show();
      $("#tituloPaso").text("Tu Diseño");
    } else {
      MostrarAlerta(
        "Opps...",
        "¡Debes Seleccionar el tipo de Chocolate deseado!",
        "error",
        "¡Entendido!"
      );
    }
  } else if ($("#diseños").is(":visible")) {
    //Mostramos los emojis
    $("#diseños").hide();
    $("#emojis").show();
    $("#tituloPaso").text("Tu Diseño");
  } else if ($("#emojis").is(":visible")) {
    if (canvas.item(0) === undefined) {
      swal(
        {
          title: "¡Tu Chocolatina está vacía!",
          text: "¿Deseas continuar con la compra?",
          type: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Si",
          closeOnConfirm: true,
        },
        function () {
          //Mostramos el dialogo de pedido
          $("#ModalPedido").modal();
        }
      );
    } else {
      swal(
        {
          title: "¡Gracias por editar tu Chocolatina!",
          confirmButtonText: "Ok",
          closeOnConfirm: true,
        },
        function () {
          //Mostramos el dialogo de pedido
          $("#ModalPedido").modal();
        }
      );
    }
  }
}

function BtnAnterior() {
  var iconElement = document.getElementById("flechaAnterior");
  var options = {
    from: "fa-arrow-left",
    to: "fa-arrow-left",
    animation: "rubberBand",
  };
  if ($("#diseños").is(":visible")) {
    //Mostramos los colores de chocolatina
    $("#diseños").hide();
    $("#color").show();
    $("#tituloPaso").text("Nuestros Sabores");
  } else if ($("#emojis").is(":visible")) {
    //Mostramos los colores de chocolatina
    $("#diseños").hide();
    $("#color").show();
    $("#tituloPaso").text("Nuestros Sabores");
  }
}

function CalcularTotal() {
  var totalCompra = 0;
  var valorChocolatina = 38000;
  var valorPolvo = 2000;
  var cantidadChocolatinas = $("#cantidad").val();

  totalCompra = valorChocolatina * cantidadChocolatinas;

  if (flagPolvoDorado == 1) {
    totalCompra = valorPolvo * cantidadChocolatinas + totalCompra;
  }
  $("#total").val(totalCompra);

  return totalCompra;
}

function Presubmit() {
  //Validamos los campos
  var fecha = new Date($("#fecha").val());

  var dateB = moment(moment(fecha).format("YYYY-MM-DD HH:ss:mm"));
  var dateC = moment(moment().format("YYYY-MM-DD HH:ss:mm"));
  var diferenciaHoras = dateB.diff(dateC, "hours");

  var horaEntrega = moment(fecha).format("HH:ss:mm");
  var HoraInicio = moment().format("06:00:00");
  var HoraFin = moment().format("20:00:00");

  if ($("#cantidad").val() < "1") {
    MostrarAlerta(
      "Opps...",
      "¡Debes pedir al menos una chocolatina!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if ($("#nombreEnvia").val() == "") {
    MostrarAlerta(
      "Opps...",
      "¡Debes escribir el nombre de quien envía la Chocolatina!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if ($("#nombreRecibe").val() == "") {
    MostrarAlerta(
      "Opps...",
      "¡Debes escribir el nombre de quien recibe la Chocolatina!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if ($("#fecha").val() == "") {
    MostrarAlerta(
      "Opps...",
      "¡Debes escoger la fecha y hora de entrega de la Chocolatina!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if (diferenciaHoras < 36) {
    MostrarAlerta(
      "Opps...",
      "Lo sentimos ¡Debemos contar con 36 horas de anticipación para preparar la Chocolatina el día y a la hora que quieres!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if (horaEntrega < HoraInicio || horaEntrega > HoraFin) {
    MostrarAlerta(
      "Opps...",
      "¡Estamos disponibles para entregar tu pedido entre las 6 de la mañana y las 8 de la noche!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if ($("#barrio").val() == "") {
    MostrarAlerta(
      "Opps...",
      "¡Debes escribir la Dirección de entrega de la Chocolatina!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if ($("#direccion").val() == "") {
    MostrarAlerta(
      "Opps...",
      "¡Debes escribir el nombre del barrio y/o indicaciones para entrega de la Chocolatina!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if ($("#telefono").val() == "") {
    MostrarAlerta(
      "Opps...",
      "¡Debes escribir tu número celular!",
      "error",
      "¡Entendido!"
    );
    return false;
  } else if ($("#telefono").val().length < "7") {
    MostrarAlerta(
      "Opps...",
      "¡Digita un número de celular válido!",
      "error",
      "¡Entendido!"
    );
    return false;
  }

  //Capturamos los valores Hidden

  //Total
  $("#totalHidden").val(CalcularTotal());

  //JSON
  //********** Canvas de exportacion ************//
  var canvasHidden = new fabric.Canvas("cHidden");
  canvasHidden.setHeight(288);
  canvasHidden.setWidth(576);
  canvasHidden.renderAll();

  //VALORES REALES
  var widthReal = 576;
  var heightReal = 288;

  //VALORES PANTALLA
  var widthPantalla = $("#divContenedorChocolate").width();
  var heightPantalla = $("#divContenedorChocolate").height();

  //ESCALA WIDTH
  var escalaWidth = 0;
  var widthObjeto = 0;

  //ESCALA HEIGHT
  var escalaHeight = 0;
  var heightObjeto = 0;

  var widthFinal = 0;
  var heightFinal = 0;
  var divisorX = 0;
  var divisorY = 0;
  var divisorScaleY = 0;
  var divisorScaleX = 0;

  var xobj = 0;
  var yobj = 0;
  var xobjFinal = 0;
  var yobjFinal = 0;
  var index = 0;

  //(Cuando la chocolatina real es mas pequeña)
  if (widthPantalla > widthReal) {
    escalaWidth = widthPantalla / widthReal;
    escalaHeight = heightPantalla / heightReal;

    canvas.forEachObject(function (obj) {
      widthObjeto = obj.getWidth();
      heightObjeto = obj.getHeight();

      widthFinal = widthObjeto / escalaWidth.toFixed(7);
      heightFinal = heightObjeto / escalaHeight.toFixed(7);

      xobj = obj.getLeft();
      yobj = obj.getTop();

      //            xobjFinal = (xobj * escalaWidth.toFixed(7));
      //            yobjFinal = (yobj * escalaHeight.toFixed(7));

      obj.scaleX = widthFinal.toFixed(7);
      obj.scaleY = heightFinal.toFixed(7);
      obj.top = yobjFinal;
      obj.left = xobjFinal;

      canvasHidden.add(obj);
      canvasHidden.renderAll();

      //Modificacion del objeto
      divisorScaleX = canvasHidden.item(index).getWidth() / widthFinal;
      divisorScaleY = canvasHidden.item(index).getHeight() / heightFinal;
      xobjFinal = (widthReal * xobj) / widthPantalla;
      yobjFinal = (heightReal * yobj) / heightPantalla;

      canvasHidden.item(index).scaleX = widthFinal.toFixed(7) / divisorScaleX;
      canvasHidden.item(index).scaleY = heightFinal.toFixed(7) / divisorScaleY;
      canvasHidden.item(index).left = xobjFinal;
      canvasHidden.item(index).top = yobjFinal;
      canvasHidden.renderAll();

      index++;
    });
  } else if (widthPantalla < widthReal) {
    //(Cuando la chocolatina real es mas grande)
    escalaWidth = widthReal / widthPantalla;
    escalaHeight = heightReal / heightPantalla;

    canvas.forEachObject(function (obj) {
      widthObjeto = obj.getWidth();
      heightObjeto = obj.getHeight();

      widthFinal = widthObjeto * escalaWidth.toFixed(7);
      heightFinal = heightObjeto * escalaHeight.toFixed(7);

      xobj = obj.getLeft();
      yobj = obj.getTop();

      //            xobjFinal = (xobj * escalaWidth.toFixed(7));
      //            yobjFinal = (yobj * escalaHeight.toFixed(7));

      obj.scaleX = widthFinal.toFixed(7);
      obj.scaleY = heightFinal.toFixed(7);
      obj.top = yobjFinal;
      obj.left = xobjFinal;

      canvasHidden.add(obj);
      canvasHidden.renderAll();

      //Modificacion del objeto
      divisorScaleX = canvasHidden.item(index).getWidth() / widthFinal;
      divisorScaleY = canvasHidden.item(index).getHeight() / heightFinal;
      xobjFinal = (widthReal * xobj) / widthPantalla;
      yobjFinal = (heightReal * yobj) / heightPantalla;

      canvasHidden.item(index).scaleX = widthFinal.toFixed(7) / divisorScaleX;
      canvasHidden.item(index).scaleY = heightFinal.toFixed(7) / divisorScaleY;
      canvasHidden.item(index).left = xobjFinal;
      canvasHidden.item(index).top = yobjFinal;
      canvasHidden.renderAll();

      index++;
    });
  } else if (widthPantalla === widthReal) {
    //Cuando las chocolatinas son iguales

    canvas.forEachObject(function (obj) {
      canvasHidden.add(obj);
      canvasHidden.renderAll();
    });
  } else {
    //Algo salio mal no se cumplenlas medidas de la escala
    MostrarAlerta(
      "Opps...",
      "Ocurrio un error, Intente de nuevo",
      "error",
      "OK"
    );
  }

  //Capturamos el JSON
  $("#json").val(JSON.stringify(canvasHidden));

  //Generamos el numero de orden
  var num_orden = "";
  num_orden = $.trim($("#nombreEnvia").val()).substring(0, 2);
  num_orden += "-";
  num_orden += moment().format("mmss");
  num_orden += "-";
  num_orden += $("#telefono").val().substring(2, 4);
  $("#num_orden").val(num_orden);

  //Traemos el data de la imagen
  //$("#imagen").val(canvasHidden.toSVG().toString());

  $("#imagen").val(canvasHidden.toDataURL("png"));

  //Capturamos el tipo de chocolate
  if (chocolateEscogido === "img/choco_negro.jpg") {
    $("#tipoChocolate").val("Chocolate Negro");
  } else if (chocolateEscogido === "img/choco_blanco.jpg") {
    $("#tipoChocolate").val("Chocolate Blanco");
  } else if (chocolateEscogido === "img/choco_dietetico.jpg") {
    $("#tipoChocolate").val("Chocolate dietetico");
  }

  //Enviamos el formulario
  $("#formulario").submit();
}

var escX = 0;
var escY = 0;
function getEmoji(emoji) {
  fabric.Image.fromURL(emoji.getAttribute("data-emoji"), function (img) {
    img.scale(0.1).setFlipX(false);
    //img.minScaleLimit = minScale;
    img.set({ opacity: 0.5 });
    canvas.add(img);
    canvas.centerObject(img);
    img.center().setCoords();
    canvas.renderAll();

    //                canvas.setActiveObject(img);
    escX = img.scaleX;
    escY = img.scaleY;
  });
}

function addText() {
  var text = new fabric.Text("¡Escribe Aquí tu mensaje!", {
    fontFamily: "rocko",
    textAlign: "center",
    opacity: 0.5,
  });

  text.scale($("#minScale").val()).setFlipX(false);
  //            text.minScaleLimit = minScale;

  var intervalo = setInterval(function () {
    canvas.add(text);
    canvas.renderAll();
    text.set({
      text: "¡Escribe Aquí tu mensaje!",
    });
    canvas.centerObject(text);
    text.center().setCoords();
    canvas.renderAll();
    canvas.remove(text);
    canvas.renderAll();
    canvas.add(text);
    canvas.renderAll();
    text.set({
      text: "¡Escribe Aquí tu mensaje!",
    });
    canvas.centerObject(text);
    text.center().setCoords();
    canvas.renderAll();
    clearInterval(intervalo);
  }, 1);

  //            canvas.setActiveObject(text);
  //text.enterEditing();
}
