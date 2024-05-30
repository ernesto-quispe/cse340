
const pool = require("../database/")

/* ***************************
 *  Retrieve review by car
 * ************************** */
async function getReviewByInvID(inv_id) {
    try {
        const data = await pool.query(
            `SELECT
                a.account_id,
                a.account_firstname,
                a.account_lastname,
                r.review_id,
                r.review_date,
                r.review_text
            FROM
                public.reviews r
            JOIN 
                public.account a 
            ON 
                r.account_id = a.account_id
            WHERE
                r.inv_id = $1
            ORDER BY
                r.review_date DESC`,
            [inv_id]
        )
        return data.rows
    } catch (error) {
        console.error("getReviewByInvID error " + error)
    }
}

/* ***************************
 *  Retrieve review by account
 * ************************** */
async function getReviewByAccountId(account_id) {
    try {
        const data = await pool.query(
            `SELECT
                a.account_id,
                a.account_firstname,
                a.account_lastname,
                r.review_id,
                r.review_date,
                r.review_text,
                i.inv_make,
                i.inv_model
            FROM
                public.reviews AS r 
            JOIN 
                public.account AS a
            ON 
                r.account_id = a.account_id
            JOIN 
                public.inventory as I
            ON 
                r.inv_id = i.inv_id
            WHERE
                r.account_id = $1`,
            [account_id]
        )
        return data.rows
    } catch (error) {
        console.error("getReviewByAccountId error " + error)
    }
}
async function getReviewByReviewId(review_id) {
    try {
        const data = await pool.query(
            `SELECT
                a.account_id,
                a.account_firstname,
                a.account_lastname,
                r.review_id,
                r.review_date,
                r.review_text,
                i.inv_make,
                i.inv_model
            FROM
                public.reviews AS r 
            JOIN 
                public.account AS a
            ON 
                r.account_id = a.account_id
            JOIN
                public.inventory as I
            ON
                r.inv_id = i.inv_id
            WHERE
                r.review_id = $1`,
            [review_id]
        )
        return data.rows[0]
    } catch (error) {
        console.error("getReviewByReviewId error " + error)
    }
}

async function addReview(review_text, inv_id, account_id) {
    try {
        const sql = `INSERT INTO reviews (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING *`
        return await pool.query(sql, [review_text, inv_id, account_id])
    } catch (error) {
        return error.message
    }
}

async function updateReview(review_text,review_id) {
    try {
        const sql = `UPDATE reviews SET review_text = $1, review_date = NOW() WHERE review_id = $2 RETURNING *`
        return await pool.query(sql, [review_text, review_id])
    } catch (error) {
        return error.message
    }
}


async function deleteReview(review_id) {
    try {
        const sql = `DELETE FROM reviews WHERE review_id = $1`
        const data = await pool.query(sql, [review_id])
        return data
    } catch (error) {
        new Error("Delete Reviews Error")
    }
}
module.exports = {
    getReviewByAccountId, getReviewByInvID, addReview, updateReview, deleteReview, getReviewByReviewId
};
