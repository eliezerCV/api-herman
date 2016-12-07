'use strict'

const Product = require('../models/product')

// GET
function getProducts(req,res){
    console.log("/GET /api/products")
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
        if(!products) return res.status(404).send({mensaje:"No existe la coleccion"})

        res.status(200).jsonp(products)
        console.log(products)
    })
}

//Get/:id
function getProduct(req,res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})
        if(!product) return res.status(404).send({mensaje:"El producto no existe"})

        res.status(200).send({product})
    })
}

//POST
function saveProoduct(req,res) {
    console.log('POST /api/products')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err,productStored)=>{
        if(err) res.status(500).send({mensaje:"Error al guardar en la BD",err})
        else res.status(200).send({product:productStored})
    })
}

//PUT
function updateProduct(req,res){
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId,update,(err,productUpdated) => {
        if(err) res.status(500).send({mensaje:`Error al actualizar el producto ${err}`})

        res.status(200).send({product:productUpdated})
    })
}

//DELETE
function deleteProduct(req,res){
    let productId = req.params.productId
    console.log(productId)
    Product.findById(productId,(err,product) => {
        if(err) res.status(500).send({mensaje:`Error al realizar la peticion ${err}`})

        product.remove(err =>{
            if(err) res.status(500).send({mensaje:`Error al borrar el producto ${err}`})
            res.status(200).send({mensaje:"El producto ha sido eliminado"}) 
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProoduct,
    updateProduct,
    deleteProduct
}