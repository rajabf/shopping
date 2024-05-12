let elProductList = document.querySelector('.product-list')
let elProductTemplate = document.querySelector('.product-template').content
// let newProductFragment = document.createDocumentFragment()
let newProductFragment = new DocumentFragment()

// SEARCH 
let elSearchForm = document.querySelector('.search-form')
let elSearchInput = document.querySelector('.search-input')

// CATEGORY 
let elProductCatgory = document.querySelector('#categories')

// filter
let elProductFilter = document.querySelector('#filter')

// console.log(elProductList, elProductTemplate);

let products = []

function renderProducts(products) {
    
    elProductList.innerHTML = ''
    
    products.forEach(product => {
        let newProduct = elProductTemplate.cloneNode(true)
        
        newProduct.querySelector('.product-img').src = product.image
        newProduct.querySelector('.product-img').alt = product.title
        newProduct.querySelector('.product-title').textContent = product.title.slice(0, 35)
        newProduct.querySelector('.product-price').textContent = `$${product.price}`
        newProduct.querySelector('.product-category').textContent = product.category
        
        newProductFragment.appendChild(newProduct)
    })
    
    elProductList.appendChild(newProductFragment)
    
}

async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        products.push(...data)
        renderProducts(data)
    }
    catch (error) {
        console.error(error.message);
    }
}

elSearchForm.addEventListener('submit', evt => {
    evt.preventDefault()
    
    let searchValue = elSearchInput.value
    let SEARCH_QUERY = new RegExp(searchValue, 'gi')
    
    let filterProducts = products.filter(product => {
        return product.title.match(SEARCH_QUERY)
    })
    
    console.log(filterProducts);
    
    renderProducts(filterProducts)
})

elProductCatgory.addEventListener('change', evt => {
    evt.preventDefault()
    
    let categoryValue = elProductCatgory.value
    let SEARCH_QUERY = new RegExp(categoryValue, 'gi')
    
    let filterProducts = products.filter(product => {
        return product.category.match(SEARCH_QUERY)
    })
    
    console.log(filterProducts);
    
    renderProducts(filterProducts)
    
})

elProductFilter.addEventListener('change', evt => {
    evt.preventDefault();
    
    // let filteredProducts = []
    
    if(elProductFilter.value == "A - Z") {
        let users = products.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        
        console.log(users);
        renderProducts(users)
        
    } else if(elProductFilter.value == "Z - A") {
        let users = products.sort(function (a, b) {
            if (a.title > b.title) {
                return -1;
            }
            if (a.title < b.title) {
                return 1;
            }
            return 0;
        });
        
        console.log(users);
        renderProducts(users)
    }  else if(elProductFilter.value == "higher price") {
        let users = products.sort(function (a, b) {
            if (a.price > b.price) {
                return -1;
            }
            if (a.price < b.price) {
                return 1;
            }
            return 0;
        });
        
        console.log(users);
        renderProducts(users)
    }   else if(elProductFilter.value == "lower price") {
        let users = products.sort(function (a, b) {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        });
        
        console.log(users);
        renderProducts(users)
    }
})

getProducts()