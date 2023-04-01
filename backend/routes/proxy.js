const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/wallhaven', async (req, res, next) => {
  try {
    const {filter = '', page = 1} = req.query;
    const {data} = await axios.get('https://wallhaven.cc/api/v1/search', {
      params: {
        q: filter,
        page,
        purity: 110,
        sorting: 'toplist',
        topRange: '1y',
      },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
