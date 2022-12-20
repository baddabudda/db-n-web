// This file contains small routes
const express = require('express');
const router = express.Router();
const listRouter = require('./listRouter');
const subjectRouter = require('./subjectRouter');
const profileRouter = require('./profileRouter')
const groupRouter = require('./groupRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


router.use('/subjects', subjectRouter);
router.use('/lists', listRouter);
router.use('/profile', profileRouter);
router.use('/group', groupRouter);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;