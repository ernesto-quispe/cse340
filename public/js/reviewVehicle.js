'use strict'

const reviewDisplay = document.getElementById("reviewDisplay");
const inv_id = reviewDisplay.getAttribute('data-inv-id');
const reviewUrl = `/review/getReviewByInvId/${inv_id}`;

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
  dataTable += '<tr><th>Reviewer</th><th>Review</th></tr>';
  dataTable += '</thead>';
  // Set up the table body
  dataTable += '<tbody>';
  // Iterate over all reviews in the array and put each in a row
  data.forEach(function (element) {
    element.reviewer = element.account_firstname.charAt(0).toLowerCase() + element.account_lastname.toLowerCase()
    console.log(element.review_id + ", " + element.review_text);
    dataTable += `<tr><td>${element.reviewer}</td>`;
    dataTable += `<td>${element.review_text}</td></tr>`;
  })
  dataTable += '</tbody>';
  // Display the contents in the Review Management view
  reviewDisplay.innerHTML = dataTable;
}

fetchReviews();