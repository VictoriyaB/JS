'use strict';

/* let text = document.querySelector('.text').textContent;
const regexp = text.replace(/\B\'/gm, '"');
console.log(regexp); */

const regexp = {
    name: /^[a-zа-яё ]+$/gi,
    phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
    email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
    message: /[a-zа-яё0-9]/
}

class ValidForm {
    form = null;
    values = null;
    params = null;
    

    constructor(selector, params) {
        this.form = document.querySelector(selector);
        this.params = params;
        this._init();   
    }

    _init() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this._getValues();
            this._checkForm();
        });
    }

    _checkForm() {
        this.checkName(); 
        this.checkPhone(); 
        this.checkEmail();
        this.checkMessage(); 
        this.form.addEventListener('focus', () => {
            this._clearError();
        });
    }
        

    _getValues() {
        const {form} = document.forms;
        const formData = new FormData(form);
        this.values = Object.fromEntries(formData.entries());
        console.log(this.values);
    }

    _clearError() {
        const input = document.querySelector('input');
        input.user.onfocus = (event) => {
            event.target.classList.remove('input_invalide');
          };
    }

    checkName() {
        if (this.params.name.test(this.values.name)) {
            console.log('OK');
        } else {
            document.querySelector('#name').textContent = 'Имя должно содержать только буквы';
            document.querySelector('[name = name]').className = 'input_invalide';
        }
    }
    checkPhone() {
        if (this.params.phone.test(this.values.phone)) {
            console.log('OK');
        } else {
            document.querySelector('#phone').textContent = 'Введите телефон в формате +7(000)000-0000';
            document.querySelector('[name = phone]').className = 'input_invalide';
        }
    }
    checkEmail() {
        if (this.params.email.test(this.values.email)) {
            console.log('OK');
        } else {
            document.querySelector('#email').textContent = 'Введите email в формате mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru';
            document.querySelector('[name = email]').className = 'input_invalide';
        }
    }
    checkMessage() {
        if (this.params.message.test(this.values.message)) {
            console.log('OK');
        } else {
            document.querySelector('#message').textContent = 'Введите сообщение';
            document.querySelector('[name = message]').className = 'input_invalide';
            
        }
    }

}




window.onload = () => {
    new ValidForm('#form', regexp);
};

