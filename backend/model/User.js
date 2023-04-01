const mongoose = require('mongoose');
const {Schema} = mongoose;

const bcrypt = require('bcrypt');

const {GallerySchema, Gallery} = require('./Gallery');
const {SettingsSchema, Settings} = require('./Settings');

const Gallery1 = require('../data/gallery1.json');

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
    trim: true,
    minlength: [6, 'Email must be at least 6 characters'],
    maxlength: [60, 'Email cannot be more than 60 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    trim: true,
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [60, 'Password cannot be more than 60 characters'],
  },
  userSettings: {
    type: SettingsSchema,
    default: new Settings(),
  },
  userGallery: {
    type: [GallerySchema],
    default: Gallery1,
  },
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.getGallery = function () {
  return this.userGallery;
};

UserSchema.methods.filterGallery = function (filter) {
  return this.userGallery.filter((item) => {
    return item.title.includes(filter);
  });
};

UserSchema.methods.addItemToGallery = function (title, url) {
  const newItem = new Gallery({title, url});
  this.userGallery.push(newItem);
  this.save();
  return newItem;
};

UserSchema.methods.removeItemFromGallery = function (id) {
  this.userGallery = this.userGallery.filter(
    (item) => item._id.toString() !== id
  );
  this.save();
  return id;
};

module.exports = mongoose.model('User', UserSchema);
