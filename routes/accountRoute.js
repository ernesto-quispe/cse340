const express = require("express")
const utilities = require("../utilities")
const router = new express.Router() 
const accountController = require("../controllers/accountController")

const regValidate = require('../utilities/account-validation')
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/registration", utilities.handleErrors(accountController.buildRegistration));
router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdate));
router.get("/",utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));
// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )
// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  accountController.accountLogin,
  utilities.handleErrors(accountController.accountLogin)
)
router.post(
  "/updateUser",
  regValidate.updateUserRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateUser)
)
router.post(
  "/updatePassword",
  regValidate.updatePasswordRules(),
  regValidate.checkUpdatePasswordData,
  utilities.handleErrors(accountController.updatePassword)
)
router.get(
  "/logout",
  utilities.handleErrors(accountController.logout)


)
module.exports = router;