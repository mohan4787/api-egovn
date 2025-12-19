const router = require("express").Router();
const { USER_ROLES } = require("../../config/constants");
const { loginCheck, checkPermission } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/request-validate.middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { ServiceCreateDTO, ServiceUpdateDTO } = require("./service.validators");
const serviceCtrl = require("./service.controller");

router
  .route("/")
  .post(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]),
    upload.single("image"),
    bodyValidator(ServiceCreateDTO),
    serviceCtrl.create
  )
  .get(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]),
    serviceCtrl.listAll
  );

router
  .route("/:id")
  .get(loginCheck, serviceCtrl.viewDetail)
  .put(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]),
    upload.single("image"),
    bodyValidator(ServiceUpdateDTO),
    serviceCtrl.update
  )
  .delete(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN]),
    serviceCtrl.deleteOne
  );

module.exports = router;
