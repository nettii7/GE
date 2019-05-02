jQuery(function($) {

    /*document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: true });*/

    /*$('body').css('overflow','hidden');
    $('body').css('position','fixed');*/


    var results = JSON.parse(localStorage.getItem("registro")) || {info: []};
    //console.log(results);

    if($('body.home').length != 0) {

        /*$('.scrollON').click(function () {
         document.addEventListener('touchmove', function(e) {
         e.preventDefault();
         }, { passive: true });
        });

        $('.scrollOFF').click(function () {
         document.addEventListener('touchmove', function(e) {
         e.preventDefault();
         }, { passive: true });
        });*/

        //localStorage.clear();
        setTimeout(function () {
            $('#logo-1').show('size');
        },500);

        function required(pregunta) {
            var valid = true;
            $.each($(pregunta + " .required"), function (index, value) {
                //alert("comes here");

                if (!$(value).val() || $(value).val() == 0) {
                    valid = false;
                    $(this).addClass('is-invalid')
                }
                else{
                    //alert('entra');
                    $(this).removeClass('is-invalid ')
                }//console.log($(value).val());


                console.log($(this));
            });

            return valid;

        }




        $('.pantalla-1').click(function () {
            $('.pantalla-1').hide('slide', {direction: "left"}, 1000);
            $('#pantalla-2').show();
            $('.swipe').hide();

        });




        $('#registro').submit(function (e) {

            e.preventDefault();

            var nombre = $('input[name=nombre]').val();
            console.log(nombre)

            $.ajax({
                type: "GET",
                url: "http://192.168.137.1/test/functions.php?action=save",
                dataType: "json",
                data: {
                    //id: $(this).data('id')
                    nombre: nombre,

                },
                success: function (data) {
                    console.log(data);
                },
                error: function (e) {
                    console.log("Error: " + e.message);
                }
            });

            // if (required("#registro")) {
            //     if($("#check1").is(':checked') && $("#check2").is(':checked')) {
            //         $('.pantalla-2').hide('fade', 1000);
            //         setTimeout(function () {
            //             $('#logo-3').show('size', 1000);
            //         });
            //
            //         results["info"].push({
            //             nombre: $('input[name=nombre]').val(),
            //             apellidos: $('input[name=apellidos]').val(),
            //             email: $('input[name=email]').val(),
            //             especialidad: $('select[name=especialidades]').val(),
            //             hospital: $('input[name=hospital]').val(),
            //             check1: $('input[name=check1]:checked').val(),
            //             check2: $('input[name=check2]:checked').val()
            //         });
            //
            //
            //         localStorage.setItem("registro", JSON.stringify(results));
            //         console.log(JSON.stringify(results))
            //     } else {
            //         $('#confirm').modal('show');
            //     }
            //
            //
            // }

        });


        $('#logo-3').click(function () {

            $('#logo-3').hide('size', 1000);

            document.getElementById('inputNombre').value = "";
            document.getElementById('inputApellido').value = "";
            document.getElementById('inputEmail').value = "";

            $('input:checkbox').removeAttr('checked');
            $('input:radio').removeAttr('checked');
            $('input:text').val("");
            $('select').val("0");
            $('textarea').val("");
            $('.swipe').show();

            setTimeout(function () {
                $('#pantalla-1').show('slide', {direction: "right"}, 1000);
                $('#logo-1').show('slide', {direction: "right"}, 1000);
            }, 500);
        });

        $('#close-tabla').click(function () {
            $("#items_table").empty();
        });

        $('#copy').click(function () {
            myFunction()
        });
        function myFunction() {
            /* Get the text field */
            var copyText = document.getElementById("json");

            /* Select the text field */
            copyText.select();

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            alert("Copied the text: " + copyText.value);
        }


        $(".swipe").swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {


                if(direction == "right") {
                    $('#registros').modal('show');


                    //console.log(results["info"]);

                    var table = $('#items_table');
                    var filas = "";
                    $.each(results["info"], function(i, item) {
                        filas +="<tr><td class='number'></td><td>" + item.nombre + "</td><td>" + item.apellidos + "</td><td>" + item.email + "</td><td>" + item.check1 + "</td><td>" + item.check2 + "</td></tr>";
                    });
                    table.html(filas);

                    $("td.number").each(function(i,v) {
                        $(v).text(i + 1);
                    });

                }
                if(direction == "left") {
                    $('#registros-json').modal('show');


                    //console.log(results["info"]);
                    //console.log(results);

                    $('#json').html(JSON.stringify(results))
                }
            }
        });



    }



});
