'use strict'

class Products {
    data = [];
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData();
        this._render();
        this.totalCostProducts();
    }

    _fetchData() {
        this.data = [
            {title: 'Notebook', id: 1, price: 2000},
            {title: 'Keyboard', id: 2, price: 200},
            {title: 'Mouse', id: 3, price: 100},
            {title: 'Gamepad', id: 4, price: 87}
        ];
    }

    _render() {
        for (let data of this.data) {
            const product = new ProductItem(data);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }

    totalCostProducts() {
       let totalCost = this.data.reduce(((total, item) => total + item.price),0);
       console.log(totalCost);
        }
    }

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';

    constructor(product, img = 'https://via.placeholder.com/250') {
        ({title: this.title, price: this.price, id: this.id} = product);
        this.img = img;
    }

    render() {
        return `
        <div class="product-item">
            <img class="product-img" src="${this.img}" alt="${this.title}">
            <div class="product-desc">
                <h3 class="product-title">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="btn-buy">Buy</button>
            </div>
        </div>`
    }
}

class Cart {
    // cartItems - массив для добавления товаров корзины
    // container  - свойство для определения класса css в разметке, где будут отрисовываться товары

    // constructor() - записывает в container переданное значение класса css.
    // Вызывает метод totalCostCart

    // render() - создает новый объект СartItem и добавляет в массив корзины cartItems.
    // Вызывает метод addToCart. Вызывается по клику на товар каталога.

    // addToCart() - добавляет в разметку объекты CartItem.

    // deleteItem() - удаляет объекты CartItem из массива cartItems

    // totalCostCart - подсчитывает стоимость корзины.
}

class CartItem {
    // наследуется от класса ProductItem
    // сonstructor - перенимает свойства id, title, price. Создает свойство quantity

    // render() - возвращает строку с разметкой товара в корзине.
}

const list = new Products('.products');

