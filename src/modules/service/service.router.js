const router = require("express").Router();
const { USER_ROLES } = require("../../config/constants"); // fixed
const { loginCheck, checkPermission } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require("../../middlewares/request-validate.middleware");

const { ServiceCreateDTO, ServiceUpdateDTO } = require("./service.validators"); // also fixed
const serviceCtrl = require("./service.controller");

router
  .route("/")
  .post(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]), // fixed keys
    bodyValidator(ServiceCreateDTO),
    serviceCtrl.create
  )
  .get(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]), // fixed keys
    serviceCtrl.listAll
  );

router
  .route("/:id")
  .get(loginCheck, serviceCtrl.viewDetail)
  .put(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN, USER_ROLES.WARDOFFICIAL]), // fixed keys
    bodyValidator(ServiceUpdateDTO),
    serviceCtrl.update
  )
  .delete(
    loginCheck,
    checkPermission([USER_ROLES.ADMIN]),
    serviceCtrl.deleteOne
  );

module.exports = router;
