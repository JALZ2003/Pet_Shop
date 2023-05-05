function nuevoProducto() {
    let nombreProducto = document.getElementById("nombreProducto").value
    let imagenProducto = document.getElementById("imagenProducto").value
    let descripcionProducto = document.getElementById("descripcionProducto").value
    let tipoProducto = ""
    if (document.getElementById('Medicamento').checked) {
        tipoProducto = document.getElementById('Medicamento').value
    } else if (document.getElementById('Juguete').checked) {
        tipoProducto = document.getElementById('Juguete').value
    }
    let precioProducto = document.getElementById("precioProducto").value
    let stockProducto = document.getElementById("stockProducto").value

    if (nombreProducto != 0 && imagenProducto != 0 && descripcionProducto != 0 && tipoProducto != 0 && precioProducto != 0 && stockProducto != 0 && nombreProducto != 0) {
    let producto = {
        nombre: nombreProducto,
        imagen: imagenProducto,
        descripcion: descripcionProducto,
        tipo: tipoProducto,
        precio: precioProducto,
        stock: stockProducto
    }

        fetch("https://pro-talento.up.railway.app/api/mindy/products", { mode: "cors",headers: {"Content-Type": "application/json"}, method: 'POST', body: JSON.stringify(producto) })
            .then(res => 'alerta para el éxito')
            .catch(err => 'alerta para el catch')
    }



    // const url = "https://pro-talento.up.railway.app/api/mindy/products";

    // const options = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(producto)
    // };

    // fetch(url, options)
    //     .then(response => {
    //         if (response.ok) {
    //             console.log("El objeto se ha creado correctamente");
    //         } else {
    //             console.error("Error al crear el objeto:", response.statusText);
    //         }
    //     })
    //     .catch(error => console.error("Error en la solicitud:", error));


}



