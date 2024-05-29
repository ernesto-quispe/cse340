const revModel = require("../models/review-model");
const utilities = require("../utilities/");
const invController = require('./invController');
const accController = require('./accountController')
const revCont = {};

revCont.addReview = async function (req, res, next) {
    let nav = await utilities.getNav();
    const {
        review_text,
        inv_id,
        account_id
    } = req.body;
    try {
        const addResult = await revModel.addReview(
            review_text,
            inv_id,
            account_id
        );
        if (addResult) {
            req.flash(
                "notice",
                `Congratulations, your review has been added.`
            );
            return accController.buildManagement(req, res, next)
        } else {
            req.flash("notice", "Sorry, Something went wrong.");
            // Redirect to the inventory view for the specified inventory item
            const inv_id = req.body.inv_id;
            return invController.buildByInventoryId(req, res, next);

        }
    } catch (error) {
        console.error(error);
        req.flash("notice", "Sorry, Something went wrong.");
        // Redirect to the inventory view for the specified inventory item
        const inv_id = req.body.inv_id;
        return invController.buildByInventoryId(req, res, next);
    }
};

revCont.getReviewByInvId = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id);

    try {
        let data = await revModel.getReviewByInvID(
            inv_id
        );
        if (data) {
            return res.json(data)
        } else {
            results = [];
            // req.flash("notice", "Sorry, Something went wrong.");
            return res.json(data)
        }
    } catch (error) {
        console.error(error);
        req.flash("notice", "Sorry, Something went wrong.");
        // Redirect to the inventory view for the specified inventory item
        return
    }
};


revCont.getReviewByAccountId = async function (req, res, next) {
    const account_id = parseInt(req.params.account_id);
    try {
        let results = await revModel.getReviewByAccountId(account_id);
        if (results) {
            return res.json(results)
        } else {
            results = [];
            // req.flash("notice", "Sorry, Something went wrong.");
            return res.json(results)
        }
    } catch (error) {
        console.error(error);
        req.flash("notice", "Sorry, Something went wrong.");
        // Redirect to the inventory view for the specified inventory item
        return
    }
};




module.exports = revCont;
