const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { log } = require('console');
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const { title } = require('process');
const http = require('http')


main()
.then(() =>{
    console.log("Connected to Database");
})
.catch((err) => {
    console.log(err)
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/MindStream')
}

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) =>{
    res.send("Server are working")
})

app.get('/listing', async(req, res) => {
    const listingvar = await Listing.find({});
})


app.listen(port, ()=>{
    console.log(`Server are listing on this port ${port}`);
})