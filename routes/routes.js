const express = require('express');

const router = express.Router();
const shortid = require('shortid');
const Model = require('../models/model');
// const utils = require('../utils/utils');

module.exports = router;

// Short URL Generator
router.post('/short', async (req, res) => {
    const { origUrl } = req.body;
    const base = process.env.BASE;

    const urlId = shortid.generate();
    // if (utils.validateUrl(origUrl)) {
      try {
        let url = await Model.findOne({ origUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;

          url = new Model({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });

          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
      }
    // } else {
    //   res.status(400).json('Invalid Original Url');
    // }
  })