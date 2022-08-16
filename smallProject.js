let title = document.getElementById('title')
let price = document.getElementById('price')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let quantity = document.getElementById('quantity')
let category = document.getElementById('category')
let sumbit = document.getElementById('sumbit')

// for creat btn to do multiple tasks
let mood = 'create'
//for indix 
let tmp

//get total
function getTotal()
{
    if(price.value != ''){
        let result = +price.value - +discount.value;
        total.innerHTML = result
        total.style.background = 'green'
    }else{
        total.innerHTML = ''
        total.style.background = ' black'

    }
}
//add product
let dataProduct
if(localStorage.product != null){
   dataProduct = JSON.parse(localStorage.product)
}else{
   dataProduct = []
}

 function click1()
{
let newItems = {
    title: title.value.toLowerCase(),
    price: price.value,
    discount: discount.value,
    total:total.innerHTML,
    quantity: quantity.value,
    category: category.value.toLowerCase(),
}
//new iteams
if(title.value!='' &&
 quantity.value!=''&& price.value!='' &&
  category.value!=''&&
 newItems.quantity<100 ){
if( mood === 'create'){
if(newItems.quantity>1){
    for(let i = 0; i<newItems.quantity;i++)
    dataProduct.push(newItems)
}else{
    dataProduct.push(newItems)
}
}else{
    dataProduct[  tmp ]= newItems
    mood = 'create'
    pass.innerHTML = 'create'
    quantity.style.display = 'block'

}
clearData()

}

//save local storage
localStorage.setItem('product', JSON.stringify(dataProduct))
showData()

}
//clear input
function clearData(){
    title.value = ''
    price.value = ''
    discount.value = ''
    total.innerHTML = ''
    quantity.value = ''
    category.value = ''

}
//read or show data in cart
function showData(){
    getTotal()
 let table = ''
 for(let i = 0 ; i < dataProduct.length;i++){
    table +=`
    <tr>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].quantity}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

</tr>`
 }
 document.getElementById('tbody').innerHTML = table
 let btnDelete = document.getElementById('deleteAll')
//count

 if(dataProduct.length>0){
    btnDelete.innerHTML = `
    <button onclick = "deleteAll()">delete All (${dataProduct.length})</button>
    `
 }else{
    btnDelete.innerHTML = ''
 }
}
showData()

//delete
function deleteData(i){
    dataProduct.splice(i,1)
    localStorage.product = JSON.stringify(dataProduct)
    showData()
}
//clean-data
function deleteAll(){
    localStorage.clear
    dataProduct.splice(0)
    showData()
}

//update
function updateData(i){
title.value = dataProduct[i].title
price.value = dataProduct[i].price
discount.value = dataProduct[i].discount
getTotal()
quantity.style.display = 'none'
category.value = dataProduct[i].category
pass.innerHTML = 'Update'
mood = 'update'
tmp = i
scroll({
    top : 0,
    behavior : 'smooth'
})
}
//search
let searchMood = ' title'
function getSearchMood(id){
    let search = document.getElementById('search')
if(id === 'searchTitle'){
    searchMood = ' title'
}else{
    searchMood = ' category'
}
search.placeholder = 'Search By'+ searchMood

search.focus
search.value = ''
showData()
}
function searchData(value){
    let table = ''
    for(let i = 0 ; i < dataProduct.length ; i++){
    if(searchMood == 'category'){
       
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].quantity}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            
            </tr>`
             }
        }


        else {
        
           
                if(dataProduct[i].title.includes(value.toLowerCase())){
                   table +=`
                   <tr>
                   <td>${dataProduct[i].title}</td>
                   <td>${dataProduct[i].price}</td>
                   <td>${dataProduct[i].quantity}</td>
                   <td>${dataProduct[i].discount}</td>
                   <td>${dataProduct[i].category}</td>
                   <td>${dataProduct[i].total}</td>
                   <td><button onclick="updateData(${i})" id="update">update</button></td>
                   <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
               
               </tr>`
            }
        }
       }
    
    
    document.getElementById('tbody').innerHTML = table
    }


