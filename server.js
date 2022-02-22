const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');


//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to Mongo databse
connectDB();

//Route files
app = express();
//Body Parser
app.use(express.json());

const bootcamps = require('./routes/bootcamps');
const { Server } = require('http');
app.use('/api/v1/bootcamps', bootcamps);

//Dev Loggin Middleware Run only when in dev environment 
if (process.env.NODE_ENV === 'development') {
    
    app.use(morgan('dev'));
}

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
process.on('unhandledRejection', (err, promise) => {
   
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
});