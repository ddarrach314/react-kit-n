'use strict';
const express = require('express');
const router = express.Router();
const exportWorker = require('../../export_worker/composer.js');

router.route('/')
  .get((req, res) => {
    req.onion = JSON.parse(req.query.onion);
    res.setHeader('Content-Type', 'application/zip');
    exportWorker.composer(req, res);
  });

module.exports = router;
