const express = require("express")
const utilities = require("../utilities")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const reviewController = require("../controllers/reviewController")

const regValidate = require('../utilities/account-validation')

router.post(
    "/addReview",
    // regValidate.registationRules(),
    // regValidate.checkRegData,
    utilities.handleErrors(reviewController.addReview)
)
router.get("/getReviewByInvId/:inv_id",
utilities.handleErrors(reviewController.getReviewByInvId)
)
router.get("/getReviewByAccountId/:account_id",
utilities.handleErrors(reviewController.getReviewByAccountId)
)
router.get("/editReview/:review_id",
utilities.handleErrors(reviewController.editReviewView)
)
router.get("/deleteReview/:review_id",
utilities.handleErrors(reviewController.deleteReviewView)
)

router.post("/editReview/",
utilities.handleErrors(reviewController.editReview)
)
router.post("/deleteReview/",
utilities.handleErrors(reviewController.deleteReview)
)


module.exports = router;