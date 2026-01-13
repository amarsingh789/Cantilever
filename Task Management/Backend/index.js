const dotenv = require('dotenv');
dotenv.config() 
const cors = require('cors')
const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const http = require('http')
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes.js')
const cookieParser = require('cookie-parser')
const taskRoutes = require('./routes/task.routes.js')

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
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Working')
})

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
app.listen(port, ()=>{
    console.log(`Server are listing on this port ${port}`);
    
})