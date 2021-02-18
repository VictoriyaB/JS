const data = [
    { title: 'Notebook', id: 1, price: 2000 },
    { title: 'Keyboard', id: 2, price: 200 },
    { title: 'Mouse', id: 3, price: 100 },
    { title: 'Gamepad', id: 4, price: 87 }
];

const renderProduct = (title = 'item', id = 100, price = 0) => {
    return `
        <div class="product-item">
        <div class="product-img"></div>
            <h3 class="product-title">${title}</h3>
            <p class="product-price">${price}</p>
        </div>
    `;
};

const render = products => {
    const productsList = products.map(item => renderProduct(item.title, item.id, item.price)).join('');
    document.querySelector('.products').insertAdjacentHTML('afterBegin', productsList);
};

render(data);