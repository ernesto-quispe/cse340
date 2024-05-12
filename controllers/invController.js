const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const data = await invModel.getInventoryById(inv_id)
  const view = await utilities.buildVehicleDetailView(data)
  let nav = await utilities.getNav()
  const vehicleName = data.inv_make + ' ' + data.inv_model
  res.render("./inventory/vehicle", {
    title: vehicleName,
    nav,
    view,
  })
}

invCont.buildByInventoryId501 = async function (req, res, next) {
next({status: 501, message: 'Sorry, no id was selected.'});

let nav = await utilities.getNav()
res.render("errors/error", {
  title: '501' || 'Server Error',
  message,
  nav
})
}


module.exports = invCont