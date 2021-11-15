let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');
let fetchURL = "http://localhost:3000/api/products/" + pageId;

function getProduct() {//retourne le tableau avec les infos du produit de la page concernée
    return fetch(fetchURL).then((r) => r.json());
}

try {
    async function displayProduct() {//affiche les infos produit
        let product = await getProduct();
        let img = document.createElement("img");
        img.src = product.imageUrl;
        document.querySelector("div.item__img").appendChild(img);
        document.getElementById("title").innerText = product.name;
        document.getElementById("price").innerText = product.price;
        document.getElementById("description").innerText = product.description;
        let colors = product.colors;
        for (let color of colors) {
            let option = document.createElement("option");
            option.value = color;
            option.innerText = color;
            document.getElementById("colors").appendChild(option);
        }
    }
}catch (error){
    console.log(error);
}



function selectValue() {//retourne la valeur selectionnée par l'user
    let selectElement = document.getElementById("colors");
    return selectElement.options[selectElement.selectedIndex].value;
}

try {
    async function sendProduct() {//envoie les infos produit dans le localstorage pour le panier
        let product = await getProduct();
        let quantity = document.getElementById("quantity").value;
        let productColor = selectValue();
        let localStorageKey = product._id + productColor;
        let productArray = [product._id, productColor, quantity]
        if (!localStorage.getItem(localStorageKey) && Number(quantity) !== 0) {
            localStorage.setItem(localStorageKey, JSON.stringify(productArray));
        } else {
            let array = JSON.parse(localStorage.getItem(localStorageKey));
            let initQty = Number(array[2]);
            array[2] = Number(quantity) + initQty;
            localStorage.setItem(localStorageKey, JSON.stringify(array));
        }

    }
} catch (error){
    console.log(error);
}


displayProduct();
document.getElementById("addToCart").addEventListener("click", sendProduct);