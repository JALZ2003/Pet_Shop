// Constantes
const containerCards = document.querySelector('.container-cards');
let mensaje = document.getElementById("mensaje")

// Funciones
function createCard(nombre, tipo, precio, imagen) {
    return `<figure class="product-card">
                <img src="${imagen}" alt="..." class="product-card__image">
                <figcaption class="product-card__caption">
                    <header class="product-card__header">
                        <h2 class="product-card__title"> ${nombre} </h2>
                        <p class="product-card__subtitle"> ${tipo} </p>
                    </header>
                    <footer class="product-card__footer">
                        <span class="product-card__price"> ${precio} </span>
                        <button class="product-card__button">
                            <i class="product-card__icon ri-add-line"></i>
                        </button>
                    </footer>
                </figcaption>
            </figure>`
}

function insertCards(list) {
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        containerCards.innerHTML += createCard(element.nombre, element.tipo, element.precio, element.imagen);
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
        }
        else {
            mensaje.innerHTML = "No se encontró este producto"
            document.getElementById("OrdenUp").disabled = true;
            document.getElementById("OrdenDown").disabled = true;
        }

    } catch (error) {
        console.log(error);
    }
}