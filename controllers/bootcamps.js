const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const { match } = require('assert');
const { param } = require('../routes/bootcamps');


// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = { ...req.query };
    
    //Fields to exclucde
    const removeFields = ['select','sort'];

    //Loop over removefields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    console.log(reqQuery);
    //Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    //Create operators ($gt,$gte,$lt, $lte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    //Findng resource
    query = Bootcamp.find(JSON.parse(queryStr));

    // Select Fields 
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sorting
    if (req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    //Execute query
    const bootcamps = await query;
    res
        .status(200)
        .json({
            success: true,
            count: bootcamps.length, data: bootcamps
        });

});

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    
        const bootcamp = await Bootcamp.findById(req.params.id);
        res.status(200).json({ success: true, data: bootcamp });
        if (!bootcamp) {
            next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
});

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps/
// @access Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
   
       const bootcamp = await Bootcamp.create(req.body); 
       res.status(201).json({
        success: true,
        data: bootcamp
    });
       
});

// @desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
   
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.param.id, req.body, {
        new: true,
        runValidators: true
    });
     
    if (!bootcamp) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    });
});

// @desc Create bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

});


// @desc Get all bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
   
    const { zipcode, distance } = req.params;
    
    //get latitude /longitude from geocoder

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calc radius using radians
    //Divide distance by radius of Earth
    // Earth Radius =6378 km / 3963 miles

    const radius = distance / 3963;
    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: { $centerSphere: [[lng, lat], radius] }}
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});