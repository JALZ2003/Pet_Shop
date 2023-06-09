// Constantes
const containerCards = document.querySelector('.container-cards');
const guardarProductos = document.querySelector('#guardarProductos');
let mensaje = document.getElementById("mensaje");
let productosAñaditos = [];
let productos = null;

if (JSON.parse(localStorage.getItem('productosAñaditos')) != null) {
    productosAñaditos = JSON.parse(localStorage.getItem('productosAñaditos'));
    productos = modifiStock(productosAñaditos, 'https://pro-talento.up.railway.app/api/mindy/products');
}

// Funciones
function createCard(id, nombre, tipo, precio, imagen) {
    return `<figure class="product-card">
                <img src="${imagen}" alt="..." class="product-card__image">
                <figcaption class="product-card__caption">
                    <header class="product-card__header">
                        <h2 class="product-card__title"> ${nombre} </h2>
                        <p class="product-card__subtitle"> ${tipo} </p>
                    </header>
                    <footer class="product-card__footer">
                        <span class="product-card__price"> ${precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })} </span>
                        <button id="${id}" class="product-card__button" onclick="datosDetails(id)">
                            <i class="product-card__icon ri-add-line"></i>
                        </button>
                    </footer>
                </figcaption>
            </figure>`
}

async function datosDetails(id) {
    try {
        let contador = 0;
        let producto = await productos;
        producto = producto.find(prod => prod._id === id);
        Swal.fire({
            imageUrl: producto.imagen,
            imageHeight: 250,
            title: producto.nombre,
            html: `<p>${producto.descripcion}</p><p>Precio: ${producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p><p class="stock">Stock: ${producto.stock}</p><div class="d-flex justify-content-center"><button id="unomenos" disabled><i class="bi bi-dash-circle-fill iconomas"></i></button><div class="contador">${contador}</div><button id="unomas"><i class="bi bi-plus-circle-fill iconomas"></i></button></div><div class="sparkle-button addcarrito mt-4"><button class="button"><span class="spark"></span><span class="backdrop"></span><svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" /><path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" /></svg><span class="text"> Añadir al Carrito </span></button></div><div class="no-stock"> No hay mas productos </div>`,
            showCloseButton: true,
            showConfirmButton: false
        });
        incrementDecrement(id, contador, producto);
    } catch (error) {
        console.log(error);
    }
}

function incrementDecrement(id, contador, producto) {
    if (producto.stock == 0) {
        document.querySelector(".no-stock").style = "color: red";
        document.getElementById("unomas").disabled = true;
        document.getElementById("unomenos").disabled = true;
        document.querySelector(".no-stock").style.visibility = "";
    } else {
        document.querySelector(".no-stock").style.visibility = "hidden";
    }
    if (producto.stock > 0 && producto.stock <= 5) {
        document.querySelector(".no-stock").textContent = "Quedan pocos productos";
        document.querySelector(".no-stock").style = "color: orange";
        document.querySelector(".no-stock").style.visibility = "";
    }
    document.getElementById("unomenos").addEventListener("click", () => {
        contador--;
        if (contador <= 0) {
            document.getElementById("unomenos").disabled = true;
            document.querySelector(".contador").textContent = contador;
            document.querySelector(".stock").textContent = "Stock: " + (producto.stock - contador);
            return;
        }
        document.getElementById("unomas").disabled = false;
        document.querySelector(".contador").textContent = contador;
        document.querySelector(".stock").textContent = "Stock: " + (producto.stock - contador);
    })
    document.getElementById("unomas").addEventListener("click", () => {
        contador++;
        if (contador >= producto.stock) {
            document.getElementById("unomas").disabled = true;
            document.querySelector(".contador").textContent = contador;
            document.querySelector(".stock").textContent = "Stock: " + (producto.stock - contador);
            return;
        }
        document.getElementById("unomenos").disabled = false;
        document.querySelector(".contador").textContent = contador;
        document.querySelector(".stock").textContent = "Stock: " + (producto.stock - contador);
    });
    document.querySelector(".button").addEventListener("click", () => {
        if (producto.stock == 0) {
            return;
        }
        if (contador != 0) {
            document.querySelector(".no-stock").style.visibility = "hidden";
            if ([...new Set(productosAñaditos.map(prodc => prodc.id))].includes(id)) {
                productosAñaditos.find(prodc => prodc.id === id).amount += contador;
            } else {
                let productAdd = { id: id, amount: contador };
                productosAñaditos.push(productAdd);
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sus productos se añadieron correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            document.querySelector(".no-stock").style = "color: black;";
            document.querySelector(".no-stock").textContent = "¿Cuantos productos desea llevar?";
            document.querySelector(".no-stock").style = "color: black";
            document.querySelector(".no-stock").style.visibility = "";
        }
    });
}

function guardarProd() {
    localStorage.setItem('productosAñaditos', JSON.stringify(productosAñaditos));
}

async function modifiStock(productosAñadidos, url) {
    try {
        let productos = await fetch(url).then(response => response.json()).then(data => data.products);
        let ids = [...new Set(productosAñadidos.map(prodc => prodc.id))];
        for (let i = 0; i < productos.length; i++) {
            const element = productos[i];
            if (ids.includes(element._id)) {
                let amountEncontrado = productosAñadidos.find(e => e.id == element._id).amount;
                element.stock -= amountEncontrado;
            }
        }
        return productos;
    } catch (error) {
        console.log(error);
    }
}

function insertCards(list) {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        containerCards.innerHTML += createCard(element._id, element.nombre, element.tipo, element.precio, element.imagen);
    }
}

async function urlFetch(url, tipo) {
    try {
        let products = await fetch(url).then(response => response.json()).then(data => data.products);
        insertCards(products);
        document.getElementById("filterSearch").addEventListener('click', () => {
            if (document.getElementById("OrdenUp").disabled == true) {
                filterData(tipo, "asc")
            } else {
                filterData(tipo, "desc")
            }
        });
        document.getElementById("OrdenUp").addEventListener('click', () => { filterData(tipo, "asc") });
        document.getElementById("OrdenDown").addEventListener('click', () => { filterData(tipo, "desc") });
    } catch (error) {
        console.log(error);
    }
}

async function filterData(tipo, orden) {
    try {
        let texto = document.getElementById("search").value.toLowerCase().trim();
        let url = `https://pro-talento.up.railway.app/api/mindy/products?tipo=${tipo}&nombre=${texto}&orden=${orden}`;
        let response = await fetch(url);
        response = await response.json();
        containerCards.innerHTML = '';
        mensaje.innerHTML = '';
        if (response.products.length != 0 && orden == "asc") {
            insertCards(response.products);
            document.getElementById("OrdenUp").disabled = true;
            document.getElementById("OrdenDown").disabled = false;
        } else if (response.products.length != 0 && orden == "desc") {
            insertCards(response.products);
            document.getElementById("OrdenDown").disabled = true;
            document.getElementById("OrdenUp").disabled = false;
        } else {
            mensaje.innerHTML = "No se encontró este producto"
            document.getElementById("OrdenUp").disabled = true;
            document.getElementById("OrdenDown").disabled = true;
        }
    } catch (error) {
        console.log(error);
    }
}