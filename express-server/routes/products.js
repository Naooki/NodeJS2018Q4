const express = require('express');

const router = express.Router();
prouductsController = require('../controllers/products');

router.get('/', (req, res) => {
    prouductsController.getAllProducts()
        .then(products => res.json(products));
});

router.post('/', (req, res) => {
    prouductsController.createProduct()
        .then(() => res.json());
});

router.get('/:id', (req, res) => {
    prouductsController.getProduct(req.params.id)
        .then(product => res.json(product), () => res.json('Product not found!'));
});

router.get('/:id/reviews', (req, res) => {
    prouductsController.getProductReviews(req.params.name)
        .then(reviews => res.json(reviews), () => res.json('Product not found!'));
});

module.exports = router;
