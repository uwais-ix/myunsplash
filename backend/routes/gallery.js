const {
  getGallery,
  addItemToGallery,
  removeItemFromGallery,
} = require('../controller/gallery');
const router = require('express').Router();
const authenticated = require('../middleware/authenticated');

router.get('/', authenticated, getGallery);
router.patch('/', authenticated, removeItemFromGallery);
router.post('/', authenticated, addItemToGallery);

module.exports = router;
