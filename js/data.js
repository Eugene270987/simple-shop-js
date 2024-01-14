'use strict'

const categories ={
    books: {
        name: 'Books',
        products: [
            {
                id: 1,
                name: 'Kindle',
                price: 100,
                description: 'A good book',
            },
            {
                id: 2,
                name: 'Pocketbook',
                price: 150,
                description: 'A very good book',
            }
        ],
    },
    phones: {
        name: 'Phones',
        products: [
            {
                id: 3,
                name: 'Samsung Galaxy S23 Ultra',
                price: 2500,
                description: 'super phone',
            },
            {
                id: 4,
                name: 'iPhone 15',
                price: 1800,
                description: 'Nice phone',
            },
            {
                id: 5,
                name: 'Xiaomi',
                price: 1000,
                description: 'Not a bad phone',
            }
        ],
    },
    tablets: {
        name: 'Tablets',
        products: [
            {
                id: 6,
                name: 'iPad',
                price: 1000,
                description: 'Nice tab',
            },
            {
                id: 7,
                name: 'iPad Pro',
                price: 1500,
                description: 'Better tab',
            },
            {
                id: 8,
                name: 'Samsung Tab 10',
                price: 1700,
                description: 'Super tab',
            }
        ],
    },
    medicines: {
        name: 'Medicines',
        products: [
            {
                id: 9,
                name: 'Solpadeine',
                price: 50,
                description: 'A cool one',
            },
            {
                id: 10,
                name: 'Citramon',
                price: 20,
                description: 'Not a good one',
            },
            {
                id: 11,
                name: 'Spasmolgon',
                price: 35,
                description: 'A middle one',
            }
        ],
    },
    shoes: {
        name: 'Shoes',
        products: [
            {
                id: 12,
                name: 'Nike',
                price: 200,
                description: 'Better one',
            },
            {
                id: 13,
                name: 'Adidas',
                price: 180,
                description: 'Best one',
            },
            {
                id: 14,
                name: 'Puma',
                price: 100,
                description: 'Good enough',
            }
        ],
    }
}

const cities = {
    any: '-- Enter your city --',
    ky: 'Kyiv',
    lv: 'Lviv',
    kh: 'Kharkiv',
    dn: 'Dnipro',
    od: 'Odessa',
    my: 'Mykolayiv',
};

const departments = {
    any: 'Please select a department',
    1: 'Department #1,Kontraktova Ploshcha, 10',
    2: 'Department #2,Zhovtneva Ploshcha, 10',
    3: 'Department #3,Ploshcha Geroyiv Maidanu, 10',
    4: 'Department #4,Ploshcha Nezalejnosti, 10',
    5: 'Department #5,Soborna Ploshcha, 10',
    6: 'Department #6,Evropeiska Ploshcha, 10',
}

const payments = {
    after: 'Післяплата',
    before: 'Оплата карткою',
}




