let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let createBtn = document.getElementById("create");
let allData = document.getElementById("allData");
let searchInput = document.getElementById("search");
let searchTitleBtn = document.getElementById("searchTitle");
let searchCategoryBtn = document.getElementById("searchCategory");
let mood = 'create';
let tmp;

function calcTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = "red";
    }
}

let productdata = localStorage.getItem("products") != null ? JSON.parse(localStorage.getItem("products")) : [];

createBtn.onclick = function() {
    if (mood === 'create') {
        creteProduct();
    } else {
        updateProduct();
    }
    clearData();
    readData();
}

searchTitleBtn.onclick = () => searchProducts('title');
searchCategoryBtn.onclick = () => searchProducts('category');

function clearData() {
    title.value = '';
    count.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.background = "red";
}

function creteProduct() {
    let newProduct = {
        title: title.value,
        count: count.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        catgory: category.value
    };
    for (let i = 0; i < count.value; i++) {
        productdata.push(newProduct);
    }
    localStorage.setItem("products", JSON.stringify(productdata));
}

function createTableRow(i, product) {
    return `
        <tr>
            <td>${i + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.catgory}</td>
            <td><button onclick="getProductData(${i})">update</button></td>
            <td><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>
    `;
}

function readData() {
    let tabel = '';
    for (let i = 0; i < productdata.length; ++i) {
        tabel += createTableRow(i, productdata[i]);
    }
    allData.innerHTML = tabel;
}

function searchProducts(searchBy) {
    let tabel = '';
    for (let i = 0; i < productdata.length; i++) {
        if (searchBy === 'title' && productdata[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            searchBy === 'category' && productdata[i].catgory.toLowerCase().includes(searchInput.value.toLowerCase())) {
            tabel += createTableRow(i, productdata[i]);
        }
    }
    allData.innerHTML = tabel || '<tr><td colspan="10">No results found</td></tr>';
}

function getProductData(i) {
    mood = 'update';
    tmp = i;
    title.value = productdata[i].title;
    price.value = productdata[i].price;
    taxes.value = productdata[i].taxes;
    ads.value = productdata[i].ads;
    discount.value = productdata[i].discount;
    category.value = productdata[i].catgory;
    count.style.display = 'none';
    createBtn.innerHTML = 'Update';
    scroll({top: 0, behavior: 'smooth'});
    calcTotal();
}

function updateProduct() {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        catgory: category.value,
        count: 1
    };
    productdata[tmp] = newProduct;
    localStorage.setItem("products", JSON.stringify(productdata));
    count.style.display = 'block';
    createBtn.innerHTML = 'Create';
    mood = 'create';
}

function deleteProduct(index) {
    productdata.splice(index, 1);
    localStorage.products = JSON.stringify(productdata);
    readData();
}

readData();