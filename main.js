import getData from "./products.js";

const tbody = document.querySelector("tbody")

getData()
    .then((response)=>response.json())
    .then((data)=>{
        showProduct(data)
        const btnRemoves = document.querySelectorAll(".btn-remove")
        for(let btn of btnRemoves){
            const id = btn.dataset.id;
            btn.addEventListener("click",function(){
                return removeProduct(id)
            })
        }

        const btnUpdates = document.querySelectorAll(".btn-update")
        for(let btn of btnUpdates){
            const id = btn.dataset.id;
            btn.addEventListener("click",function(){
                return updateProduct(id)
            })
        }
    })
const showProduct= (data) =>{
    tbody.innerHTML = data.map((product,index)=>{
        return `
            <tr>
                <td>${index+ 1}</td>
                <td>${product.productName}</td>
                <td><img src="${product.image}"></td>
                <td>
                    <button data-id="${product.id}" class="btn-remove">Xoa</button>
                    <button data-id="${product.id}" class="btn-update">Cap nhat</button>
                </td>
            </tr>
        `
    }).join("")
}
const removeProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`,{
        method:"DELETE"
    })
}

const addProduct = () => {
    document.querySelector("body").innerHTML = /*html*/`
        <form action="">
            <input type="text" id="productName" />
            <input type="text" id="image" />
            <button id="btn-submit">Them</button>
        </form>
    `
    document.querySelector("#btn-submit").addEventListener("click",function(){
        const newProduct = {
            "productName": document.querySelector("#productName").value,
            "image": document.querySelector("#image").value,
        }
        fetch(`http://localhost:3000/products`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
    })
}
document.querySelector("#btn-add").addEventListener("click",addProduct)

const updateProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`)
        .then((response)=>response.json())
        .then((data) => {
            
            document.querySelector("body").innerHTML = /*html*/`
                <form action="">
                    <input type="text" id="productName" value="${data.productName}"/>
                    <input type="text" id="image" value="${data.image}"/>
                    <button id="btn-update">Sua</button>
                </form>
            `
            document.querySelector("#btn-update").addEventListener("click",function(){
                const newProduct = {
                    "id":id,
                    "productName": document.querySelector("#productName").value,
                    "image": document.querySelector("#image").value,
                }
                fetch(`http://localhost:3000/products/${id}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(newProduct)
                })
            })
        })
}
