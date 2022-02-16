const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
   
    res.status(200).json({success: true, data: {id:1}})
});

router.get('/:id', (req, res) => {
   
    res.status(200).json({success: true, data: {id:1}})
});

router.post('/', (req, res) => {
   
    res.status(200).json({success: true, data: {id:1}})
});

router.put('/:id', (req, res) => {
   
    res.status(200).json({success: true, data: {id:1}})
});

router.delete('/:id', (req, res) => {
   
    res.status(200).json({success: true, data: {id:1}})
});

module.exports = router;