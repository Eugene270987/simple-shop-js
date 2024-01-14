'use strict'
function showCategories() {
    const parentElement = document.getElementById('left');

    createElement('button', parentElement, 'MY ORDERS', {id: 'btn__orders'}, {click: cleanAndShowOrders});

    for (let categoryKey in categories) {
        const category = categories[categoryKey];
        const element = createElement('div', parentElement, `${category.name}`, {className: 'category', 'data-category': categoryKey});
        element.style.cursor = 'pointer';
    }
}

function cleanAndShowOrders () {
    cleanCategories();
    showUserOrders()
}

function cleanCategories () {
    const categoryElements = document.querySelectorAll('.category');

    for (let element of categoryElements) {
        cleanElement(element);
    }
    const centerElement = document.getElementById('center');
    const rightElement = document.getElementById('right');
    cleanElement(centerElement);
    cleanElement(rightElement);
}

function showUserOrders() {
    const ordersData = JSON.parse(localStorage.getItem('orders'));

    const centerBlock = document.getElementById('center');
    centerBlock.innerHTML = '';

    if (ordersData && ordersData.length > 0) {
        for (let i = 0; i < ordersData.length; i++) {
            const order = ordersData[i];
            const orderInfo = `${order.productName} $${order.productPrice} Order Date: ${order.orderDate}`;
            const infoContainer = createElement('div', centerBlock, orderInfo, { className: 'order', cursor: ongotpointercapture});
            const removeButton = createElement('button', infoContainer, 'REMOVE', { type: 'button', id: 'btn__remove' });
            removeButton.addEventListener('click', function () {
                removeOrder(order);
            });
        }
    } else {
        createElement('div', centerBlock, 'No orders yet.');
    }
}

function removeOrder(orderToRemove) {
    const index = orders.findIndex(order => (
        order.productName === orderToRemove.productName && order.productPrice === orderToRemove.productPrice && order.orderDate === orderToRemove.orderDate
    ));

    if (index !== -1) {
        orders.splice(index, 1);
        updateStorage();
        const orderElements = document.querySelectorAll('.order');
        orderElements.forEach(element => {
            const text = element.textContent;
            if (text.includes(`${orderToRemove.productName} $${orderToRemove.productPrice} Order Date: ${orderToRemove.orderDate}`)) {
                element.remove();
            }
        });
    }
}

function showProducts(products, category) {
    const parentElement = document.getElementById('center');
    parentElement.innerHTML = '';

    for (let product of products) {
        const element = createElement('div', parentElement, `${product.name} $${product.price}`, {'data-product': product.id, 'data-category': category});
        element.style.cursor = 'pointer';
    }
}
function showInfo(product) {
    const parentElement = document.getElementById('right');
    parentElement.innerHTML = '';

    const productName = product.name;
    const productPrice = product.price;

    order.productName = productName;
    order.productPrice = productPrice;

    createElement('div', parentElement, `Name: ${product.name} Price: ${product.price} Description: ${product.description},`)
    createElement('button', parentElement, 'BUY NOW', {id: 'btn'}, {click: showModal});
}
function createForm () {
    const parentElement = document.querySelector('.my__modal');
    const userForm = createElement('form', parentElement, '', {id: 'form'});
    // NAME & SURNAME
    const nameLabel = createElement('label', userForm, 'Enter your name: ') ;
    createElement('input', nameLabel, '', {name: 'name', type: 'text', id: 'name__input', placeholder: 'Enter your name'})
    const lastNameLabel = createElement('label', userForm, 'Enter your last name: ');
    createElement('input', lastNameLabel, '', {name: 'name', type: 'text', id: "lastname__input", placeholder: 'Enter your last name'});
    // SELECT CITY
    const cityLabel = createElement('label', userForm, 'Select city ');
    const citySelect = createElement('select', cityLabel, '', { id: 'city', name: 'city' });

    for (const cityKey in cities) {
        const cityName = cities[cityKey];
        createElement('option', citySelect, cityName, { value: cityKey });
    }
    // Select Department
    const depLabel = createElement('label', userForm, 'Select department: ');
    const depSelect = createElement('select', depLabel, '', { id: 'department', name: 'department' });

    for (const depKey in departments) {
        const depName = departments[depKey];
        createElement('option', depSelect, depName, { value: depKey, selected: depKey === 'any' });
    }
    // QUANTITY
    const quantityLabel = createElement('label', userForm, 'Select quantity: ');
    createElement('input', quantityLabel, '', { id: 'quantity', name: 'quantity', value: '1', type: 'number', min: '1', max: '50', step: '1'});
    // ADD INFO
    const textAreaLabel = createElement('label', userForm, 'Additional information: ');
    createElement('textarea', textAreaLabel, '', {name: 'information', id: 'text__content', placeholder: 'Enter any info'});
    //PAYMENT
    const paymentLabel = createElement('label', userForm, 'Select method of payment: ');
    const paymentSelect = createElement('select', paymentLabel, '', { id: 'payment', name: 'payment' });

    for (const paymentKey in payments) {
        const paymentName = payments[paymentKey];
        createElement('option', paymentSelect, paymentName, { value: paymentKey });
    }

    const cardLabel = createElement('label', userForm, 'Enter card: ');
    const cardInput = createElement('input', cardLabel, '', { type: 'text', name: 'cardInput', id: 'card__input', placeholder: 'Enter valid card number: XXXX-XXXX-XXXX-XXXX' });

    cardLabel.style.display = 'none';
    cardInput.style.display = 'none';
    paymentSelect.addEventListener('change', function () {
        const selectedPayment = paymentSelect.value;
        if (selectedPayment === 'after') {
            cardLabel.style.display = 'none';
            cardInput.style.display = 'none';
        } else {
            cardLabel.style.display = 'flex';
            cardInput.style.display = 'block';
        }
    });
    //BUTTONS
    const buttonContainer = createElement('div', userForm, '', {id: 'button__container'});
    createElement('button', buttonContainer, 'CLOSE', {type: 'button', id: 'btn__close'}, {click: closeModal});
    createElement('button', buttonContainer, 'SAVE', {type: 'button', id: 'btn__save'}, {click: showTable});
}
function createModal () {
    const myModal = createElement('div', document.body, '', {className: 'my__modal'});
    createElement('h2', myModal, 'Fill in the following form', {className: 'modal__title'});
    createForm();

    return myModal;
}
function showModal (){
    const modal = document.querySelector('.my__modal');
    if(!modal) {
        createModal();
    }
}
function closeModal () {
    const modal = document.querySelector('.my__modal');
    if (modal) {
        modal.remove();
    }
}

function showTable() {
    const isValid = validate();
    if (isValid) {
        saveOrderDetails(order);
        createTable();
    }
}

function createTable() {
    const form = document.getElementById('form');
    const modal = document.querySelector('.my__modal');

    modal.innerHTML = '';

    createElement('h2', modal, 'USER DATA', { className: 'modal__title' });

    const formElements = form.elements;

    Array.from(formElements).forEach(element => {
        if (element.tagName === 'SELECT') {
            const selectedOptionText = element.options[element.selectedIndex].textContent;
            createElement('div', modal, `${element.name}: ${selectedOptionText}`, {className: 'user__field'});
        } else if( element.tagName !== 'BUTTON'){
            createElement('div', modal, `${element.name}: ${element.value}`,{className: 'user__field'});
        }
    });

    createElement('button', modal, 'OK', {type: 'button', id: 'btn__confirm'}, {click: closeModal});
}

function validateNameInput(input) {
    const inputValue = input.value;
    const pattern = /^[A-Za-z]+$/g;
    const result = inputValue.match(pattern);
    return Boolean(result);
}

function validateSelect(select) {
    const selectedValue = select.value;
    return selectedValue !== 'any';
}

function validateNumberInput(input) {
    const inputValue = input.value;
    const pattern = /^[1-9]\d*$/g;
    const result = inputValue.match(pattern);
    return Boolean(result);
}

function validateCardInput(input) {
    const inputValue = input.value;
    const pattern = /^(\d{4}-){3}\d{4}$/g;
    const result = inputValue.match(pattern);
    return Boolean(result);
}

function validate() {
    const userInputs = document.querySelectorAll('input[name="name"]');
    const selectElements = document.querySelectorAll('select');
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    const cardInputs = document.querySelectorAll('input[id="card__input"]');
    const paymentSelect = document.getElementById('payment');
    const selectedPayment = paymentSelect.value;

    let isValid = true;

    for (let input of userInputs) {
        if (!validateNameInput(input)) {
            showError(input);
            isValid = false;
        } else {
            removeError(input);
        }
    }

    for (let select of selectElements) {
        if (!validateSelect(select)) {
            showError(select);
            isValid = false;
        } else {
            removeError(select);
        }
    }

    for (let input of quantityInputs) {
        if (!validateNumberInput(input)) {
            showError(input);
            isValid = false;
        } else {
            removeError(input);
        }
    }

    if (selectedPayment !== 'after') {
        for (let input of cardInputs) {
            if (!validateCardInput(input)) {
                showError(input);
                isValid = false;
            } else {
                removeError(input);
            }
        }
    }

    return isValid;
}
function showError(element) {
    element.classList.add('element__error');
}

function removeError(element) {
    element.classList.remove('element__error');
}

function updateStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function saveOrderDetails (order) {
    const newOrder = {
        name: document.getElementById('name__input').value,
        lastName: document.getElementById('lastname__input').value,
        city: document.getElementById('city').value,
        department: document.getElementById('department').value,
        quantity: document.getElementById('quantity').value,
        information: document.getElementById('text__content').value,
        payment: document.getElementById('payment').value,
        cardInput: document.getElementById('card__input').value,
        productName: order.productName,
        productPrice: order.productPrice * document.getElementById('quantity').value,
    }

    const orderDate = new Date().toLocaleString();

    newOrder.orderDate = orderDate;

    orders.push(newOrder);
    updateStorage();
}