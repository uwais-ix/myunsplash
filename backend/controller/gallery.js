const {InvalidField} = require('../errors/error-types');
const {StatusCodes} = require('http-status-codes');

const getGallery = async (req, res) => {
  const filter = req.query.filter;
  const user = req.user;

  let gallery;
  if (filter) {
    gallery = user.filterGallery(filter);
  } else {
    gallery = user.getGallery();
  }

  return res.status(StatusCodes.OK).json(gallery);
};

const addItemToGallery = async (req, res) => {
  const {title, url} = req.body;
  const user = req.user;

  if (!title) {
    throw InvalidField('Title is required', 'title');
  }
  if (!url) {
    throw InvalidField('URL is required', 'url');
  }

  const newImg = user.addItemToGallery(title, url);

  return res.status(StatusCodes.OK).json(newImg);
};

const removeItemFromGallery = async (req, res) => {
  const {id} = req.body;
  const user = req.user;

  if (!id) {
    throw new Error('ID is required');
  }

  if (!user) {
    throw new Error('User not found');
  }

  user.removeItemFromGallery(id);

  return res.status(StatusCodes.OK).json(true);
};

module.exports = {
  getGallery,
  addItemToGallery,
  removeItemFromGallery,
};
