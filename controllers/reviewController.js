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


revCont.getReviewByReviewId = async function (req, res, next) {
    const review_id = parseInt(req.params.review_id);
    try {
        let results = await revModel.getReviewByReviewId(review_id);
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


revCont.editReviewView = async function (req, res, next) {
    const review_id = parseInt(req.params.review_id)
    let nav = await utilities.getNav()
    const reviewData = await revModel.getReviewByReviewId(review_id)
    const reviewName = `${reviewData.inv_make} ${reviewData.inv_model}`
    res.render("./review/edit-review", {
        title: "Edit " + reviewName + "Review",
        nav,
        errors: null,
        inv_id: reviewData.inv_id,
        inv_make: reviewData.inv_make,
        inv_model: reviewData.inv_model,
        review_id: reviewData.review_id,
        review_text: reviewData.review_text,
        account_id: reviewData.account_id,
        account_firstname: reviewData.account_firstname,
        account_lastname: reviewData.account_lastname,
    })
}


revCont.deleteReviewView = async function (req, res, next) {
    const review_id = parseInt(req.params.review_id)
    let nav = await utilities.getNav()
    const reviewData = await revModel.getReviewByReviewId(review_id)
    const reviewName = `${reviewData.inv_make} ${reviewData.inv_model}`
    res.render("./review/delete-review", {
        title: "Delete " + reviewName + " Review",
        nav,
        errors: null,
        review_id: reviewData.review_id,
        inv_make: reviewData.inv_make,
        inv_model: reviewData.inv_model,
        review_text: reviewData.review_text,
    })
}

revCont.editReview = async function (req, res, next) {
    let nav = await utilities.getNav();
    const {
        review_text,
        review_id
    } = req.body;
    try {
        const updateResult = await revModel.updateReview(review_text,review_id);
        if (updateResult) {
            req.flash(
                "notice",
                `Congratulations, your review has been updated.`
            );
            return accController.buildManagement(req, res, next)
        } else {
            req.flash("notice", "Sorry, Something went wrong.");
            // Redirect to the inventory view for the specified inventory item
            return accController.buildManagement(req, res, next)
        }
    } catch (error) {
        console.error(error);
        req.flash("notice", "Sorry, Something went wrong.");
        return accController.buildManagement(req, res, next)

    }
};



revCont.deleteReview = async function (req, res, next) {
    let nav = await utilities.getNav();
    const {
        review_id
    } = req.body;
    try {
        const deleteResult = await revModel.deleteReview(review_id);
        if (deleteResult) {
            req.flash(
                "notice",
                `Congratulations, your review has been deleted.`
            );
            return accController.buildManagement(req, res, next)
        } else {
            req.flash("notice", "Sorry, Something went wrong.");
            // Redirect to the inventory view for the specified inventory item
            return accController.buildManagement(req, res, next)
        }
    } catch (error) {
        console.error(error);
        req.flash("notice", "Sorry, Something went wrong.");
        return accController.buildManagement(req, res, next)

    }
};
module.exports = revCont;
