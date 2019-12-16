const mongoose = require('mongoose');

const Product = mongoose.model(
    'product', new mongoose.Schema({
        name: String,
        type: String,
        description: String,
        date: Date,
        price: String, 
        _created: Date
    })
)

const getAllProducts = () => {
    return new Promise((success, fail) => {
        Product.find({}, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    })
}

const getOne = (id) => {
    return new Promise((success, fail) => {
        Product.find({ _id: id }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data)
        })
    })
}

const saveProduct = (data) => {
    return new Promise((success, fail) => {
        var newProduct = new Product(data);
        newProduct.save(data, err => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    })
}

const replaceProduct = (id, data) => {
    return new Promise((success, fail) => {
        Product.updateOne({ _id: id }, data, err => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}


const deleteProduct = (id) => {
    return new Promise((success,fail) => {
        Product.findByIdAndRemove(id, err => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    })
}

module.exports = {
    getAllProducts,
    getOne,
    saveProduct,
    replaceProduct,
    deleteProduct
}