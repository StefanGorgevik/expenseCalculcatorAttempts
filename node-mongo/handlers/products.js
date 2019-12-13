const productModel = require('../models/products')

const getAllProducts = (req, res) => {
    productModel.getAllProducts()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
}

const getOne = (req, res) => {
    productModel.getOne(req.params.id)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

const saveProduct = (req, res) => {
    const newProduct = req.body;
    let errors = 0;
    if (newProduct.name == undefined || newProduct.name.length == 0) { errors++ };
    if (newProduct.type == undefined || newProduct.type.length == 0) { errors++ };
    if (newProduct.description == undefined || newProduct.description.length == 0) { errors++ };
    if (newProduct.date == undefined || newProduct.date.length == 0) { errors++ };
    if (newProduct.price == undefined || newProduct.price.length == 0) { errors++ };
    if (errors == 0) {
        productModel.saveProduct(newProduct)
            .then(() => {
                res.status(201).send("Created");
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    } else {
        res.status(400).send("Bad Request!");
    }
}

const replaceProduct = (req, res) => {
    const newProduct = req.body;
    let errors = 0;
    if (newProduct.name == undefined || newProduct.name.length == 0) { errors++ };
    if (newProduct.type == undefined || newProduct.type.length == 0) { errors++ };
    if (newProduct.description == undefined || newProduct.description.length == 0) { errors++ };
    if (newProduct.date == undefined || newProduct.date.length == 0) { errors++ };
    if (newProduct.price == undefined || newProduct.price.length == 0) { errors++ };
    if (errors == 0) {
        productModel.replaceProduct(req.params.id, newProduct)
            .then(() => {
                res.status(204).send("Product replaced");
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    } else {
        res.status(400).send("Bad Request!");
    }
}

const updateProduct = (req, res) => {
    var newProduct = req.body;
    productModel.replaceProduct(req.params.id, newProduct)
        .then(() => {
            res.status(201).send('Item updated!');
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const deleteProduct = (req, res) => {
    productModel.deleteProduct(req.params.id)
    .then(() => {
        res.status(204).send("Item deleted");
    })
    .catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = {
    getAllProducts,
    getOne,
    saveProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}