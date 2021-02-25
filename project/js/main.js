'use strict'

const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status !== 200) {
                reject('Error')
            }
            resolve(xhr.responseText);
        }
        xhr.send();
    });
};

getRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
    .then((result) => {
        console.log(result);
    })
    .catch((err) => console.log(err));


class Products {
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData()
            .then(() => this._render())
            .then(() => this.totalCostProducts());
    }

    _fetchData() {
       return fetch(`${API}/catalogData.json`)
           .then(result => result.json())
           .then(data => {
               for (let product of data) {
                   this.products.push(new ProductItem(product));
               }
           })
    }

    _render() {
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }

            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }

    totalCostProducts() {
        return this.products.reduce(((total, item) => total + item.price),0);
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';
    rendered = false;

    constructor(product, img = 'https://via.placeholder.com/250') {
        ({product_name: this.title, price: this.price, id_product: this.id} = product);
        this.img = img;
    }

    render() {
        this.rendered = true;
        return `
        <div class="product-item">
            <img class="product-img" src="${this.img}" alt="${this.title}">
            <div class="product-desc">
                <h3 class="product-title">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="btn-buy" data-id="${this.id}">Buy</button>
            </div>
        </div>`
    }

    addToCart() {
        document.querySelector('.btn-buy').addEventListener('click', event => {
  
        });
    }
}

class Cart {
    cartItems = [];    
    container = null;   

    constructor(selector) {
        this.container = document.querySelector(selector);
        //render();
        //totalCostCart();

  }   
        
     render() {
        for (let product of this.cartItems) {
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
     }

    // deleteItem() - удаляет объекты CartItem из массива cartItems

    // totalCostCart - подсчитывает стоимость корзины.
}

class CartItem extends ProductItem{
    constructor(product, img = 'https://via.placeholder.com/100') {
        super(product, img);
        this.quantity = 1;
    }

    render() {
        this.rendered = true;
        return `
        <div class="product-item"> 
            <img class="product-img" src="${this.img}" alt="${this.title}">
            <div class="product-desc">
                <h3 class="product-title">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="btn-buy" data-id="${this.id}">Buy</button>
            </div>
        </div>` //ИЗМЕНИТЬ!
    }
}

const list = new Products('.products');
const cart = new Cart('.cart');


