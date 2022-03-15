const express = require('express');

const {
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp, 
    getBootcampsInRadius,
    bootcampPhotoUpload,
    getBootcamps } = require('../controllers/bootcamps');


const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advanceResults');    
// Include other resource routers
const courseRouter = require('./courses');

const { protect } = require('../middleware/auth');

const router = express.Router();

//Re-route into other resource routers 
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:id/photo').put(protect,bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp,'courses'), getBootcamps)
    .post(protect,createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(protect,updateBootcamp)
    .delete(protect,deleteBootcamp);


module.exports = router;