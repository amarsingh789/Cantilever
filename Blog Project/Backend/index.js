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
const userRoutes = require('./routes/user.js')
const cookieParser = require('cookie-parser')
const postRoutes = require('./routes/post.router.js')

// const MONGO_URL ='mongodb://127.0.0.1:27017/MindStream'
const dbUrl = process.env.ATLASDB_URL

main()
.then(() =>{
    console.log("Connected to Database");
})
.catch((err) => {
    console.log(err)
});
async function main() {
    await mongoose.connect(dbUrl)
}

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) =>{
    res.send("Server are working")
})

app.get('/listing', async(req, res) => {
    const listingvar = await Listing.find({});
})

app.use('/users',userRoutes)

app.listen(port, ()=>{
    console.log(`Server are listing on this port ${port}`);
})