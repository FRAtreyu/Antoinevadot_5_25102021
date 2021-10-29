let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');
let fetchURL = "http://localhost:3000/api/products/" + pageId;

function getProduct() {
    return fetch(fetchURL).then((r) => r.json());
}

async function displayProduct() {
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


function selectValue() {
    let selectElement = document.getElementById("colors");
    return selectElement.options[selectElement.selectedIndex].value;
}

async function sendProduct() {
    let product = await getProduct();
    let quantity = document.getElementById("quantity").value;
    let productColor = selectValue();
    let localStorageKey=product._id+productColor;
    let productArray=[product._id,productColor,quantity]
    if (!localStorage.getItem(localStorageKey)){
        localStorage.setItem(localStorageKey,JSON.stringify(productArray));
    }else{
        let array=JSON.parse(localStorage.getItem(localStorageKey));
        let initQty=Number(array[2]);
        array[2]=Number(quantity) + initQty;
        localStorage.setItem(localStorageKey,JSON.stringify(array));
    }
}

displayProduct();
document.getElementById("addToCart").addEventListener("click",sendProduct);