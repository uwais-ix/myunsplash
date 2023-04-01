const router = require('express').Router();

const {
  login: loginController,
  signup: signupController,
  getSettings: getSettingsController,
  updateSettings: updateSettingsController,
  isUserAuthenticated,
} = require('../controller/account');
const authenticated = require('../middleware/authenticated');

// authenticated routes
router.get('/settings', authenticated, getSettingsController);
router.patch('/settings', authenticated, updateSettingsController);
router.get('/auth', authenticated, isUserAuthenticated);

// unauthenticated routes
router.post('/login', loginController);
router.post('/signup', signupController);

module.exports = router;
