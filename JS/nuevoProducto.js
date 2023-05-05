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
    let precioProducto = parseInt(document.getElementById("precioProducto").value);
    let stockProducto = parseInt(document.getElementById("stockProducto").value);

    if (nombreProducto != 0 && imagenProducto != 0 && descripcionProducto != 0 && tipoProducto != 0 && precioProducto != 0 && stockProducto != 0 && nombreProducto != 0) {
        let producto = {
            "nombre": nombreProducto,
            "imagen": imagenProducto,
            "descripcion": descripcionProducto,
            "tipo": tipoProducto,
            "precio": precioProducto,
            "stock": stockProducto
        }

        fetch("https://pro-talento.up.railway.app/api/mindy/products", {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud POST');
        }).then(producto => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡¡El producto se creo exitosamente!!',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error}`
            })
        })
        document.getElementById("nombreProducto").value = "";
        document.getElementById("imagenProducto").value = "";
        document.getElementById("descripcionProducto").value = "";
        document.getElementById("precioProducto").value = 0;
        document.getElementById("stockProducto").value = 0;
    }
}