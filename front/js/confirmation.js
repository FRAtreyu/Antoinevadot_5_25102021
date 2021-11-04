let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');

document.getElementById("orderId").innerText=pageId;