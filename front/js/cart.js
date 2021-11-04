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

function deleteItem(element) {//supprime l'item dans le DOM et le localStorage
    let deleteId = element.dataset.id;
    let parentNode = element.closest("section");
    let childNode = element.closest("article");
    console.log(childNode);
    console.log(deleteId);
    console.log(parentNode);
    parentNode.removeChild(childNode);
    localStorage.removeItem(deleteId);
    setTotals();
}

function modifyQuantity(element) {//modifie la quantité dans le localStorage
    let newValue = element.value;
    let modifyId = element.dataset.id;
    console.log(newValue);
    console.log(modifyId);
    let array = JSON.parse(localStorage.getItem(modifyId));
    array[2] = Number(newValue);
    localStorage.setItem(modifyId, JSON.stringify(array));
    setTotals();
}

function isnotEmpty(value) {
    return /.*\S.*/.test(value);
}

function isValidAlphaString(value) {//regex firstName,lastName,city
    return /^[a-zàâçéèêëîïôûùüÿñæœ'-]*$/i.test(value) && isnotEmpty(value);
}

function isValidAddress(value) {//regex address
    return (/^\s*\S+(?:\s+\S+){2}/ || /^[a-zàâçéèêëîïôûùüÿñæœ '-]*$/i).test(value) && isnotEmpty(value);
}

function isValidEmail(value) {//regex email
    return /^\S+@\S+\.\S+$/.test(value) && isnotEmpty(value);
}

function formErrorAlphaDisplay(id) {
    document.getElementById(`${CSS.escape(id)}ErrorMsg`).innerText = "Veuillez rentrer un champ valide";
}

function validateForm() {
    let alphaString = ["firstName", "lastName", "city"];
    for (let string of alphaString) {
        document.getElementById(`${CSS.escape(string)}`).addEventListener('change', function () {
            if (isValidAlphaString(document.querySelector(`input[id=${CSS.escape(string)}]`).value)) {
                document.getElementById(`${CSS.escape(string)}ErrorMsg`).innerText = "";
            } else {
                formErrorAlphaDisplay(string);
            }
        })
    }
    document.getElementById("address").addEventListener('change', function () {
        if (isValidAddress(document.getElementById("address").value)) {

            document.getElementById(`addressErrorMsg`).innerText = "";
        } else {
            formErrorAlphaDisplay("address");
        }
    })
    document.getElementById("email").addEventListener('change', function () {
        if (isValidEmail(document.getElementById("email").value)) {
            document.getElementById(`emailErrorMsg`).innerText = "";
        } else {
            formErrorAlphaDisplay("email");
        }
    })
    return document.getElementById(`firstNameErrorMsg`).innerText === ""
        && document.getElementById(`lastNameErrorMsg`).innerText === ""
        && document.getElementById(`addressErrorMsg`).innerText === ""
        && document.getElementById(`cityErrorMsg`).innerText === ""
        && document.getElementById('emailErrorMsg').innerText === "";
}


async function sendOrder(event) {
    event.preventDefault();
    let formValid = await validateForm();
    if (localStorage.length > 0 && formValid) {
        let products = [];
        for (let i = 0; i < localStorage.length; i++) {
            let productArray = JSON.parse(localStorage.getItem(localStorage.key(i)));
            products[i] = productArray[0];
        }
        console.log(products);

        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        };
        console.log(contact);
        const rawResponse = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact, products})
        });
        const content = await rawResponse.json();
        let orderId = content.orderId;
        document.location.href = "./confirmation.html?id=" + orderId;
    }

}

async function loadPage() {//lance les fonctions dans l'ordre et initialise les listener
    await displayBasket();
    await setTotals();
    let tabDelete = document.querySelectorAll(".deleteItem");
    let tabModify = document.querySelectorAll(".itemQuantity");
    console.log(tabDelete);
    console.log(tabModify);
    for (let tabModifyElement of tabModify) {
        tabModifyElement.addEventListener('change', function () {
            modifyQuantity(tabModifyElement)
        }, false);

    }
    for (let tabDeleteElement of tabDelete) {
        tabDeleteElement.addEventListener('click', function () {
            deleteItem(tabDeleteElement)
        }, false);
    }
}

loadPage();
document.getElementById("firstNameErrorMsg").innerText = "Champ obligatoire";
document.getElementById("lastNameErrorMsg").innerText = "Champ obligatoire";
document.getElementById("addressErrorMsg").innerText = "Champ obligatoire";
document.getElementById("cityErrorMsg").innerText = "Champ obligatoire";
document.getElementById("emailErrorMsg").innerText = "Champ obligatoire";
validateForm();
document.getElementById("order").addEventListener('click', sendOrder);