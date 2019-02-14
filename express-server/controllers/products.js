const _ = require('lodash');

const products = require('../models/product');

module.exports = {
    getAllProducts: () => Promise.resolve(products),
    createProduct: () => Promise.resolve('Create product...'),
    getProduct: id => {
        const product = _.find(products, { id });
        return product ? Promise.resolve(product) : Promise.reject('Not found');
    },
    getProductReviews: id => {
        const product = _.find(products, { id });
        return product ? Promise.resolve(product.reviews) : Promise.reject('Not found');
    },
};
