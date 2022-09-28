const express = require('express');

const router = express.Router();
const Model = require('../models/model');

module.exports = router;

// Redirection
router.get('/:urlId', async (req, res) => {
    try {
      const url = await Model.findOne({ urlId: req.params.urlId });
      if (url) {
        url.clicks++;
        url.save();
        return res.redirect(url.origUrl);
      } else res.status(404).json('Not found');
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  })