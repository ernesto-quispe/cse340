const accountModel = require("../models/account-model")
const utilities = require("../utilities/")
/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    const view = utilities.buildLoginView()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
      view,
    })
  }
  async function buildRegistration(req, res, next) {
    let nav = await utilities.getNav()
    const view = utilities.buildRegistrationView()
    res.render("account/registration", {
      title: "Register",
      nav,
      errors: null,
      view,
    })
  }
/* ****************************************
*  Process Registration
* *************************************** */
async function loginAccount(req, res) {
  const { account_email, account_password } = req.body
  res.status(200).send('login process')


}
/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    const view = utilities.buildLoginView();
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      view,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    const view = utilities.buildRegistrationView();
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
      view,
    })
  }
}
/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  const view = utilities.buildRegistrationView();
  res.render("account/registration", {
    title: "Register",
    nav,
    errors: null,
    view,
  })
}
  module.exports = { buildLogin, buildRegistration, registerAccount, buildRegister, loginAccount }