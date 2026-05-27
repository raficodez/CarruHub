const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount: {
        type:Number,
        default:0
    },
    panelcolor:String,
    bgcolor:String,
    textcolor:String
})

module.exports = mongoose.model("product",productSchema)