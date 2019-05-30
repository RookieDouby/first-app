const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'My Express Home', message: 'Fuck'})
})

module.exports = router;