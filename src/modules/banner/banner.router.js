const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { USER_ROLES } = require("../../config/constants");
const { loginCheck, checkPermission } = require("../../middlewares/auth.middleware");
const bannerCtrl = require("./banner.controller");

router
  .route("/")
  .post(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]),
    upload.single("image"),
    bannerCtrl.create
  )
  .get(loginCheck, bannerCtrl.listAll);

router
  .route("/:id")
  .get(loginCheck, bannerCtrl.viewDetail)
  .put(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]),
    upload.single("image"),
    bannerCtrl.update
  )
  .delete(loginCheck, checkPermission([USER_ROLES.ADMIN]), bannerCtrl.deleteOne);

module.exports = router;
