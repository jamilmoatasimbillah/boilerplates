!process.env.NODE_ENV && require('dotenv').config();

require('./models');
const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());



if(process.env.NODE_ENV === "production"){
    const path = require('path');
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err) => {
    if(!err){
        const {PORT} = process.env;
        app.listen(PORT, ()=>console.log(`server is running at http://localhost:${PORT}`));
    } else{
        console.error('\nSomething went wrong...\nDatabase connection faliled....\nCannot start the server\n\n')
    }
})