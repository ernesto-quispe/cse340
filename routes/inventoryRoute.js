const express = require("express")
const utilities = require("../utilities")
const router = new express.Router() 
const invController = require("../controllers/invController")
const inventoryValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));
router.get("/detail/", utilities.handleErrors(invController.buildByInventoryId501));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView));
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteInventoryView));
router.post("/update/",
inventoryValidate.inventoryRules(),
inventoryValidate.checkUpdateData, 
utilities.handleErrors(invController.updateInventory)); 
router.post("/delete/",
utilities.handleErrors(invController.deleteInventory)); 
router.post("/add-classification", 
inventoryValidate.addClassificationRules(),
inventoryValidate.checkClassificationData,
utilities.handleErrors(invController.addClassification));
router.post("/add-inventory", 
inventoryValidate.inventoryRules(),
inventoryValidate.checkInventoryData,
utilities.handleErrors(invController.addVehicle));


module.exports = router;