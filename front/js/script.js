function getProducts(){
    return fetch("http://localhost:3000/api/products") .then((r)=>r.json());
}

function setProductLink(product){
    document.getElementById("items").createElement("a");
    document.querySelector("#items a").href="./product.html?id="+product._id;
    document.querySelector("#items a").createElement("article");
}

function setProductImage(product){
    let img = document.querySelector("#items a article").createElement("img");
    img.href=product.imageUrl;
    img.alt=product.altTxt;
}

function setProductName(product){
    let h3 = document.querySelector("#items a article").createElement("h3");
    h3.setAttribute("class","productName");
    h3.innerText=product.name;
}

function setProductDescription(product){
    let p = document.querySelector("#items a article").createElement("p");
    p.setAttribute("class","productDescription");
    p.innerText=product.description;

}

async function loadProducts(){
    let products=await getProducts();
    for (let product of products) {
        setProductLink(product);
        setProductImage(product);
        setProductName(product);
        setProductDescription(product);
    }
}

loadProducts();
