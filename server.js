const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

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