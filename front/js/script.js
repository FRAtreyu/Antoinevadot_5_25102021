function getProducts() {// retourne le tableau JSON avec les objets produits
    return fetch("http://localhost:3000/api/products").then((r) => r.json());
}

try {
    async function displayProducts() {//affiche les produits sur la page d'accueil
        let products = await getProducts();//enregistre le tableau JSON
        for (let product of products) {//boucle pour tous les éléments du tableau
            let a = document.createElement("a");
            let article = document.createElement("article");
            let img = document.createElement("img");
            let h3 = document.createElement("h3");
            let p = document.createElement("p");
            a.href = "./product.html?id=" + product._id;
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            h3.setAttribute("class", "productName");
            h3.innerText = product.name;
            p.setAttribute("class", "productDescription");
            p.innerText = product.description;
            document.getElementById("items").appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);
        }
    }
} catch (error){
    console.log(error);
}


displayProducts();
