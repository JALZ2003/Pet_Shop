// Constantes
const containerCards = document.querySelector('.container-cards');

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

async function urlFetch(url) {
    try {
        let products = await fetch(url).then(response => response.json()).then(data => data.products);
        insertCards(products);
    } catch (error) {
        console.log(error);
    }
}