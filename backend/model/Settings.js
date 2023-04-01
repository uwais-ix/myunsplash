const mongoose = require('mongoose');
const {Schema} = mongoose;

const SettingsSchema = new Schema({
  // require password before delete?
  requirePassword: {
    type: Boolean,
    default: false,
  },
  // include wallhaven wallpapers in search or only saved wallpapers
  wallHaven: {
    type: Boolean,
    default: true,
  },
});

SettingsSchema.methods.setRequirePassword = function (requirePassword = false) {
  this.requirePassword = requirePassword;
};

SettingsSchema.methods.setWallhaven = function (wallHaven = true) {
  this.wallHaven = wallHaven;
};

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = {
  SettingsSchema,
  Settings,
};
