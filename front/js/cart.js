function getProduct(url) {
    return fetch(url).then((r) => r.json());
}


async function displayBasket() {//affiche les différents produits présents dans le local storage
    for (let i = 0; i < localStorage.length; i++) {
        let productArray = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let productId = productArray[0];
        let productColor = productArray[1];
        let productQuantity = productArray[2];
        let fetchURL = "http://localhost:3000/api/products/" + productId;
        let product = await getProduct(fetchURL);
        let article = document.createElement("article");
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", productId + productColor);
        let cart__item__img = document.createElement("div");
        cart__item__img.setAttribute("class", "cart__item__img");
        let img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        let cart__item__content = document.createElement("div");
        cart__item__content.setAttribute("class", "cart__item__content");
        let cart__item__content__titlePrice = document.createElement("div");
        cart__item__content__titlePrice.setAttribute("class", "cart__item__content__titlePrice");
        let h2 = document.createElement("h2");
        h2.innerText = product.name + " " + productColor;
        let pPrice = document.createElement("p");
        pPrice.innerText = product.price + "€";
        pPrice.setAttribute("id", "productPrice");
        let cart__item__content__settings = document.createElement("div");
        cart__item__content__settings.setAttribute("class", "cart__item__content__settings");
        let cart__item__content__settings__quantity = document.createElement("div");
        cart__item__content__settings__quantity.setAttribute("class", "cart__item__content__settings__quantity");
        let pQuantity = document.createElement("p");
        pQuantity.innerText = "Qté :";
        pQuantity.setAttribute("id", "productQuantity");
        let input = document.createElement("input");
        input.type = "number";
        input.name = "itemQuantity";
        input.min = "1";
        input.max = "100";
        input.value = productQuantity;
        input.setAttribute("class", "itemQuantity");
        input.setAttribute("data-id", productId + productColor);
        let cart__item__content__settings__delete = document.createElement("div");
        cart__item__content__settings__delete.setAttribute("class", "cart__item__content__settings__delete");
        let pDelete = document.createElement("p");
        pDelete.setAttribute("class", "deleteItem");
        pDelete.setAttribute("data-id", productId + productColor)
        pDelete.innerText = "Supprimer";
        document.getElementById("cart__items").appendChild(article);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}]`).appendChild(cart__item__img);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}]`).appendChild(cart__item__content);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__img`).appendChild(img);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content`).appendChild(cart__item__content__titlePrice);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content`).appendChild(cart__item__content__settings);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content__titlePrice`).appendChild(h2);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content__titlePrice`).appendChild(pPrice);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content__settings`).appendChild(cart__item__content__settings__quantity);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content__settings`).appendChild(cart__item__content__settings__delete);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content__settings__quantity`).appendChild(pQuantity);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content__settings__quantity`).appendChild(input);
        document.querySelector(`article[data-id=${CSS.escape(productId + productColor)}] .cart__item__content__settings__delete`).appendChild(pDelete);
    }
}

async function setTotals() {//affiche les totaux du panier
    let totalPrice = 0;
    let totalQuantity = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let productArray = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let productId = productArray[0];
        let productQuantity = Number(productArray[2]);
        let fetchURL = "http://localhost:3000/api/products/" + productId;
        let product = await getProduct(fetchURL);
        totalQuantity = totalQuantity + productQuantity;
        totalPrice = totalPrice + productQuantity * Number(product.price);
    }
    document.getElementById("totalQuantity").innerText = totalQuantity;
    document.getElementById("totalPrice").innerText = totalPrice;
}

async function loadPage(){
    await displayBasket();
    await setTotals();
    let tabDeleteItem=document.querySelectorAll(".deleteItem");
    console.log(tabDeleteItem);
    for (let tabDeleteItemElement of tabDeleteItem) {
        let id=tabDeleteItemElement.dataset.id;
        console.log(id);
        tabDeleteItemElement.addEventListener("Click",localStorage.removeItem(id));
    }
}

loadPage();

