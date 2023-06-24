

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let index;
let searchMode = 'title';
// Get Total 
function getTotal() {
        if (price.value != '') {
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

        let newProduct = {
                title: title.value.toLowerCase(),
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                count: count.value,
                category: category.value.toLowerCase(),
        }
        if (title.value != '' && price.value != '' && category.value != '' && newProduct.count < 100) {
                if (mode === 'create') {
                        if (count.value > 1) {
                                for (let i = 0; i < count.value; i++) {
                                        dataPro.push(newProduct);
                                }
                        } else {
                                dataPro.push(newProduct);
                        }

                } else {
                        dataPro[index] = newProduct;
                        mode = 'create';
                        submit.innerHTML = 'Create';
                        count.style.display = 'block'
                }
                clearData();
        }



        localStorage.setItem('product', JSON.stringify(dataPro))

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
        getTotal();

        let table;

        for (let i = 0; i < dataPro.length; i++) {
                table += `
<tr>                                
<td>${i + 1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateItem(${i})" id="update">update</button></td>
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
function updateItem(i) {
        console.log(dataPro[i]);

        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;

        getTotal();

        count.style.display = 'none';
        submit.innerHTML = 'Update';
        mode = 'update';

        index = i;
        window.scroll({ top: 0, behavior: 'smooth' });
}

//search
function getSearchMode(id) {
        let searchText = document.getElementById('search');

        if (id == 'searchTitle') {
                searchMode = 'title'


        } else {
                searchMode = 'category';
        }
        searchText.focus();
        searchText.placeholder = ` search By ${searchMode.toLocaleUpperCase()}`;

        searchText.value = '';
        showData();
}


function searchData(value) {
        let table = '';
        for (let i = 0; i < dataPro.length; i++) {
                if (searchMode == 'title') {


                        if (dataPro[i].title.includes(value.toLowerCase())) {
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
<td><button onclick="updateItem(${i})" id="update">update</button></td>
<td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
</tr>`;
                        }
                        // searchData();

                } else {


                        if (dataPro[i].category.includes(value.toLowerCase())) {
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
<td><button onclick="updateItem(${i})" id="update">update</button></td>
<td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
</tr>`;
                        }
                        // searchData();
                }
        }
        document.getElementById('tbody').innerHTML = table;
}






// clean data 