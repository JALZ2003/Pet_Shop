const contendorCarrito = document.querySelector('.carrito');
const total = document.querySelector('.total');
let productosAñaditos = JSON.parse(localStorage.getItem('productosAñaditos'));

insertCardsCar(productosAñaditos, 'https://pro-talento.up.railway.app/api/mindy/products');

function createCards(id, imagen, nombre, tipo, precio, cantidad) {
    return `<div class="row  text-center filas rounded mb-1">
                <div class="col-lg-3 col-md-6 col-12 mt-2 mb-2">
                    <img src="${imagen}" class="imglista rounded " alt="">
                </div>
                <div class="col-lg-4 col-md-6 col-12 infotit">
                    <h5 class="card-title"> ${nombre} </h5>
                    <p>Tipo: ${tipo}
                        <br>Precio: ${precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}
                    </p>
                </div>
                <div class="col-lg-2 col-md-4 col-4 colinfo">
                    <p> Cantidad: ${cantidad} </p>
                </div>
                <div class="col-lg-2 col-md-4 col-4 colinfo">
                    <p> Subtotal: ${(cantidad * precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })} </p>
                </div>
                <div class="col-lg-1 col-md-4 col-4 colinfo">
                    <button id="${id}" class="botoneliminar" onclick="deleteProduct(id)"><i class="bi bi-trash3"></i></button>
                </div>
            </div>`;
}

async function insertCardsCar(list, url) {
    try {
        contendorCarrito.innerHTML = '';
        let products = await fetch(url).then(response => response.json()).then(data => data.products);
        let totalAcumulado = 0;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            let product = products.find(product => product._id === element.id);
            contendorCarrito.innerHTML += createCards(element.id, product.imagen, product.nombre, product.tipo, product.precio, element.amount);
            totalAcumulado += element.amount * product.precio;
        }
        total.textContent = totalAcumulado.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
    } catch (error) {
        console.log(error);
    }
}

function deleteProduct(id) {
    let product = productosAñaditos.find(prod => prod.id === id);
    let position = productosAñaditos.findIndex(prod => prod.id === id);
    product.amount--;
    if (product.amount === 0) {
        productosAñaditos.splice(position, 1);
    }
    insertCardsCar(productosAñaditos, 'https://pro-talento.up.railway.app/api/mindy/products');
    localStorage.setItem('productosAñaditos', JSON.stringify(productosAñaditos));
}