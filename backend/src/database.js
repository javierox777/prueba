import mongoose from 'mongoose'


const URI = "mongodb://localhost/blockchain"


mongoose.connect(URI, {

})



const connections = mongoose.connection

connections.once("open", () => {
    console.log("db is ok")
})