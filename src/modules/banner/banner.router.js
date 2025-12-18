const UserRole = require('../../config/constants').USER_ROLES;
const { loginCheck, checkPermission } = require('../../middlewares/auth.middleware');
const { uploader } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/request-validate.middleware');
// const { bodyValidator } = require('../../modules/banner/banner.validators');
const bannerCtrl = require('./banner.controller');
const { BannerCreateDTO, BannerUpdateDTO } = require('./banner.validators');

const bannerRouter = require('express').Router();

// Public route
bannerRouter.get('/front', bannerCtrl.lisAllForHome);

// Protected routes
bannerRouter.post(
    '/',
    loginCheck,
    uploader().single('image'),
    bodyValidator(BannerCreateDTO),
    bannerCtrl.createBanner
);
bannerRouter.get('/', loginCheck, bannerCtrl.listAllData);

// Admin-only routes
bannerRouter.get('/:id', loginCheck, checkPermission([UserRole.ADMIN]), bannerCtrl.getById);
bannerRouter.put(
    '/:id',
    loginCheck,
    checkPermission([UserRole.ADMIN]),
    uploader().single('image'),
    bodyValidator(BannerUpdateDTO),
    bannerCtrl.updateBanner
);
bannerRouter.delete('/:id', loginCheck, checkPermission([UserRole.ADMIN]), bannerCtrl.deleteById);

module.exports = bannerRouter;
