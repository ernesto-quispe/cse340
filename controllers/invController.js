const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    errors: null,
    grid,
  });
};

invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inv_id;
  const data = await invModel.getInventoryById(inv_id);
  const view = await utilities.buildVehicleDetailView(data);
  let nav = await utilities.getNav();
  const vehicleName = data.inv_make + " " + data.inv_model;
  res.render("./inventory/vehicle", {
    title: vehicleName,
    nav,
    errors: null,
    view,
    inv_id
  });
};

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const title = "Vehicle Management";
  const classificationList = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title: title,
    nav,
    classificationList,
    errors: null,
  });
};

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const title = "Add New Classification";
  res.render("./inventory/add-classification", {
    title: title,
    nav,
    errors: null,
  });
};
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const title = "Add New Vehicle";
  let classificationList = await utilities.buildClassificationList();
  res.render("./inventory/add-inventory", {
    title: title,
    nav,
    classificationList,
    errors: null,
  });
};
/* ****************************************
 *  addClassification
 * *************************************** */
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;
  const addResult = await invModel.addClassification(classification_name);

  if (addResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added  ${classification_name}.`
    );
    // const view = utilities.buildLoginView();
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList();
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      classificationList,
      errors: null,
      // view,
    });
  } else {
    req.flash("notice", "Sorry, the classification was invalid.");
    // const view = utilities.buildRegistrationView();
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
      // view,
    });
  }
};
/* ****************************************
 *  addVehicle
 * *************************************** */
invCont.addVehicle = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  const addResult = await invModel.addVehicle(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );

  if (addResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added  ${inv_make} ${inv_model}.`
    );
    // const view = utilities.buildLoginView();
    let classificationList = await utilities.buildClassificationList();
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      classificationList,
      errors: null,
      // view,
    });
  } else {
    req.flash("notice", "Sorry, the vehicle was invalid.");
    // const view = utilities.buildRegistrationView();
    let classificationList = await utilities.buildClassificationList();
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: null,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      // view,
    });
  }
};

invCont.buildByInventoryId501 = async function (req, res, next) {
//   let nav = await utilities.getNav();
//   res.render("errors/error", {
//     title: "501" || "Server Error",
//     message,
//     nav,
//     errors: null,
//   }
// );
  next({ status: 501, message: "Sorry, no id was selected." });


};
/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationList = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationList = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}
/* ***************************
 *  Build delete inventory view
 * ************************** */
invCont.deleteInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price
  })
}
/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.deleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_price,
    inv_year
  } = req.body
  const updateResult = await invModel.deleteInventory(
    inv_id
  )

  if (updateResult) {
    const itemName = inv_make + " " + inv_model
    req.flash("notice", `The ${itemName} was successfully deleted.`)
    res.redirect("/inv/")
  } else {
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the delete failed.")
    res.status(501).render("inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_price
    })
  }
}
module.exports = invCont;
