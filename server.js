const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');


const apilimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to Mongo databse
connectDB();

//Route files
app = express();
//Body Parser
app.use(express.json());

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

//File uploading
app.use(fileUpload());
//Set static folder 
app.use(express.static(path.join(__dirname,'public')));

//Sanitize Data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent cross site scripting attack
app.use(xss());

//Apply the rate limiting middleware to API calls 
app.use('/api', apilimiter);

//Preventing htto paramaeter pollution
app.use(hpp());

//Enable CORS
app.use(cors())

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/auth/users', users);
app.use('/api/v1/reviews', reviews);


app.use(cookieParser());


app.use(errorHandler);

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