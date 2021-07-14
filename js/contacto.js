 
$(document).ready(function () {
  
  /*Animaciones*/

  $(function() {
    $('a').click(function(e) {

        e.preventDefault();

        var url = $(this).attr('href');
        var content = $('body');

        content.fadeOut(20, function() {

            $("body").append('<div id="cargando">Cargando...</div>');

            var loading = $('#cargando');

            loading.fadeIn(200, function() {
                content.load(url, function() { 
                    loading.fadeOut(20, function() {
                        $(this).remove();
                        content.fadeIn(200);
                    });
                });
            });   
        });
    });
});




  /*Formulario Contacto*/
  
  $("#form").append(`<h1 class="contact__title"id = "titleContacto">Contacto</h1>`);
  $("#form").append(`<h2 class="subtitle" id = "subtitleContacto">Escribí tu consulta</h2>`);
  $("#form").append(`<form class="contact__form"id=formulario>
                  
                  <input class="contact__input" id="name" type="text" placeholder="Nombre"required>
                  <input class="contact__input" id="email" type="text" placeholder="Correo electrónico"required>
                  <textarea id="message" type="text" placeholder="Escribí tu consulta"required></textarea>
                  <input class="contact__submit" id ="submit" type="submit" value="ENVIAR">
        </form>`);
          
    $("#formulario").submit(function (e) {
          
          e.preventDefault();
          let hijos = $(e.target).children();
          console.log(hijos[0].value);
          console.log(hijos[1].value);
          console.log(hijos[2].value);
  
          $("#subtitleContacto").fadeOut(400, function() {
            $(this).html("Gracias por contactarte con nosotros!").fadeIn(400);
          
        });
  
  });

});