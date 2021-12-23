const {Schema, model} = require('mongoose')


const schemaTrans = new Schema({
    mensaje:String,
    date:String,
    monto:Number,
    id:String
})



module.exports = model("transacciones", schemaTrans)