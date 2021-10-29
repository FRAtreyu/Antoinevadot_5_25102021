let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');
let fetchURL="http://localhost:3000/api/products/"+pageId;
function getProduct(){
    return fetch(fetchURL) .then((r)=>r.json());
}

async function displayProduct(){
    let product=await getProduct();
    let img=document.createElement("img");
    img.src=product.imageUrl;
    document.querySelector("div.item__img").appendChild(img);
    document.getElementById("title").innerText=product.name;
    document.getElementById("price").innerText=product.price;
    document.getElementById("description").innerText=product.description;
    let colors=product.colors;
    for (let color of colors) {
        let option=document.createElement("option");
        option.value=color;
        option.innerText=color;
        document.getElementById("colors").appendChild(option);
    }
}

displayProduct();
