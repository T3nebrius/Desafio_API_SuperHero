/**
 * archivo logicas js
 */

const boton = $('#botonSubmit');
const mensaje = $('#resultado');
const input = $('#superheroId');
const nombreHTML = $('#nombre');
const fotoHTML = $('#foto');
const conexionesHTML = $('#conexiones');
const publicadoHTML = $('#publicado');
const ocupacionHTML = $('#ocupacion');
const primeraAparicionHTML = $('#primeraAparicion');
const alturaHTML = $('#altura');
const pesoHTML = $('#peso');
const alianzasHTML = $('#alianzas');

boton.on('click', function() {
    const id = input.val();
    mensaje.text('');
    
    if (id.trim() === '') {
        alert('Por favor, ingrese un ID de superhéroe.');
        return;
    }

    const url = `https://www.superheroapi.com/api.php/c4cefd321c24a03cad4a667d650ee553/${id}`;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.response === "success") {
                const nombre = data.name;
                const conexiones = data.connections["group-affiliation"];
                const publicado = data.biography["publisher"];
                const ocupacion = data.work["occupation"];
                const primeraAparicion = data.biography["first-appearance"];
                const altura = data.appearance["height"];
                const peso = data.appearance["weight"];
                const alianzas = data.biography.aliases;
                const foto = data.image["url"];

                nombreHTML.text("Nombre: " + nombre);
                fotoHTML.attr('src', foto);
                conexionesHTML.text("Conexiones: " + conexiones);
                publicadoHTML.text("Publicado por: " + publicado);
                ocupacionHTML.text("Ocupación: " + ocupacion);
                primeraAparicionHTML.text("Primera Aparición: " + primeraAparicion);
                alturaHTML.text("Altura: " + altura);
                pesoHTML.text("Peso: " + peso);
                alianzasHTML.text("Alianzas: " + alianzas);

                let chart_values = [];

                $.each(data.powerstats, function(key, value) {
                    chart_values.push({
                        label: key,
                        y: value
                    });
                });

                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    title: {
                        text: "Estadísticas de Poder"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 240,
                        indexLabel: "{label} {y}",
                        dataPoints: chart_values
                    }]
                });
                chart.render();
            } else if (data.response === "error") {
                alert(`Error: ${data.error}`);
            } else {
                mensaje.text('Respuesta inesperada de la API.');
            }
        },
        error: function(xhr, status, error) {
            mensaje.text(`Hubo un problema con la petición: ${error}`);
        }
    });
});
