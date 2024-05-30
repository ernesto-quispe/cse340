'use strict'

const reviewDisplay = document.getElementById("reviewDisplay");
const account_id = reviewDisplay.getAttribute('data-account-id');
const reviewUrl = `/review/getReviewByAccountId/${account_id}`;

async function fetchReviews() {
  try {
    const response = await fetch(reviewUrl);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      buildReviewTable(data);
    } else {
      throw new Error("Network response was not OK");
    }
  } catch (error) {
    console.log('There was a problem: ', error.message);
  }
}

function buildReviewTable(data) {
  console.log("data" + data);
  // Set up the table labels
  let dataTable = '<thead>';
  dataTable += '<tr><th>Car</th><th>Review</th><th>Modify Review</th><th>Delete Review</th></tr>';
  dataTable += '</thead>';
  // Set up the table body
  dataTable += '<tbody>';
  // Iterate over all reviews in the array and put each in a row
  data.forEach(function (element) {
    element.reviewer = element.account_firstname.charAt(0).toLowerCase() + element.account_lastname.toLowerCase()
    dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`
    dataTable += `<td>${element.review_text}</td>`
    dataTable += `<td><a class='reviewLinks' href="/review/editReview/${element.review_id}">Modify</a>`
    dataTable += `<td><a class='reviewLinks' href="/review/deleteReview/${element.review_id}">Delete</a></tr>`;
  })
  dataTable += '</tbody>';
  // Display the contents in the Review Management view
  reviewDisplay.innerHTML = dataTable;
}

fetchReviews();