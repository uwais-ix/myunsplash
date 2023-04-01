const mongoose = require('mongoose');
const {Schema} = mongoose;

const GallerySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    minLenght: [3, 'Title cannot be less than 3 characters'],
    maxlength: [30, 'Title cannot be more than 150 characters'],
  },
  url: {
    type: String,
    required: [true, 'Please provide a url'],
    trim: true,
  },
});

GallerySchema.methods.getTitle = function () {
  return this.title;
};

GallerySchema.methods.getUrl = function () {
  return this.url;
};

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = {
  Gallery,
  GallerySchema,
};
