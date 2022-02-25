const express = require('express');

const {
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp, 
    getBootcampsInRadius,
    getBootcamps} = require('../controllers/bootcamps');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);


module.exports = router;