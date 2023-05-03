let url = "https://pro-talento.up.railway.app/api/mindy/products?tipo=medicamento"

async function fetchApi(url) {
    try {
        let response = await fetch(url);
        response = await response.json();
        console.log(response.products)
    } catch (error) {
        console.log(error)
    }
}

fetchApi(url)