function getProducts(){
    return fetch("http://localhost:3000/api/products") .then((r)=>r.json());
}

async function displayProducts(){
    let products=await getProducts();
    for (let product of products) {
        let a=document.createElement("a");
        let article=document.createElement("article");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        a.href="./product.html?id="+product._id;
        img.src=product.imageUrl;
        img.alt=product.altTxt;
        h3.setAttribute("class","productName");
        h3.innerText=product.name;
        p.setAttribute("class","productDescription");
        p.innerText=product.description;
        document.getElementById("items").appendChild(a);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
    }
}

displayProducts();
