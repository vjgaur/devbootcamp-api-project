const express = require('express');
const dotenv = require('dotenv');

app = express();
//Route files
const bootcamps = require('./routes/bootcamps');
app.use('/api/v1/bootcamps', bootcamps);

//Load env vars
dotenv.config({ path: './config/config.env' });


const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV;

app.listen(PORT, (err) => {

    
    if (err) {
        console.log("Error occurred",err);
    }
    
     console.log(`server running in 
    ${env} 
    mode on port ${PORT}`);
});