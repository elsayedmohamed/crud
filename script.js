

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


// Get Total 
function getTotal() {
        if (price.value != ' ') {
                let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
                total.innerHTML = result;
                total.style.background = 'green';
        } else {
                total.innerHTML = '';
                total.style.background = 'red';
        }
}
// create product 

let dataPro;
if (localStorage.length > 0) {
        dataPro = JSON.parse(localStorage.product);

} else {
        dataPro = [];
}

submit.onclick = function () {

        let data = {
                title: title.value,
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                count: count.value,
                category: category.value,
        }

if(count.value>1){
        for(let i=0; i<count.value;i++){
                 dataPro.push(data);
        }
}else{
        dataPro.push(data);    
}

       
        localStorage.setItem('product', JSON.stringify(dataPro))
        clearData();
        showData();

}




// save data to local storage


// clear inputs

function clearData() {
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
}

// read
function showData() {
        let table;

        for (let i = 0; i < dataPro.length; i++) {
                table += `
<tr>                                
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button id="update">update</button></td>
<td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
</tr>`;
        }
        document.getElementById('tbody').innerHTML = table;


        let btnDelete = document.getElementById('deleteAll');
        if (dataPro.length > 0) {
                btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `

        } else {
                btnDelete.innerHTML = '';
        }

}
showData()
// count
// count


// delete
function deleteItem(i) {

        dataPro.splice(i, 1);
        localStorage.product = JSON.stringify(dataPro);


        showData()
}

//delete All 
function deleteAll() {
        dataPro.splice(0);
        localStorage.clear();
        showData();

}

// update


//search

// clean data 