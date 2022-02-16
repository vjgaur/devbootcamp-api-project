const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')

app = express();
//Route files
const bootcamps = require('./routes/bootcamps');
app.use('/api/v1/bootcamps', bootcamps);

//Dev Loggin Middleware Run only when in dev environment 
if (process.env.NODE_ENV === 'development') {
    
    app.use(morgan('dev'));
}



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