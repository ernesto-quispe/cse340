const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<div id="classification-div"> <ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<div class="class-img-div"> <a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a></div>'
        grid += '<div class="namePrice">'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul> </div>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }
/* **************************************
* Build the Detail view HTML
* ************************************ */
  Util.buildVehicleDetailView = async function(data){
    if (!data) {
      return '<p class="notice">Sorry, no vehicle information found.</p>';
    }
  let view = `
  <div class="vehicle-detail">
    <h1>${data.inv_year} ${data.inv_make} ${data.inv_model} </h1>
    <div>
    <img id="img-id" src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}" />
    </div>
    <div class="vehicle-info">
      <h2> ${data.inv_make} ${data.inv_model} Details</h2>
      <p><strong>Price:</strong> <span id='li-price'>$${new Intl.NumberFormat('en-US').format(data.inv_price)}</span></p>
      <p> <strong>Description:</strong> ${data.inv_description}</p>
      <p><strong>Color:</strong> ${data.inv_color}</p>
      <p><strong>Miles:</strong> ${new Intl.NumberFormat('en-US').format(data.inv_miles)}</p>

    </div>
  </div>
  `; 
    return view
  }
  /* **************************************
* Build the login HTML
* ************************************ */
Util.buildLoginView = function(){
  
let view = `
<form class="login-form" id="loginForm" action="/account/login" method="post">
      <fieldset>
        <label class="top">Email* <input type="email" name="account_email" placeholder="someone@gmail.com" required id="email"
            autocomplete="email"></label>
        <label class="top">Password* <input type="password" name="account_password" required id="password" pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:<>?]).{12,}$"
            autocomplete="password"></label>
            <p>Password must be at least 12 characters, include 1 capital letter, 1 number, and 1 special character</p>              
        <input type="submit" value="Login" class="submitBtn">
        <div>
        <p>No account?</p><a href="/account/registration">Sign-up</a>
        </div>
      </fieldset>
    </form>
`; 
  return view
}
  /* **************************************
* Build the registration HTML
* ************************************ */
Util.buildRegistrationView = function(){
  
  let view = `
  <form class="login-form" method="post" action="/account/register">
        <fieldset>
        <label class="top">First name* <input type="text" name="account_firstname" value="<%= locals.account_firstname %>" required id="firstname"></label>
        <label class="top">Last name* <input type="text" name="account_lastname" value="<%= locals.account_lastname %>" required id="lastname"></label>              
          <label class="top">Email* <input type="email" name="account_email" placeholder="someone@gmail.com" value="<%= locals.account_email %>" required id="email"
              autocomplete="email"></label>
          <label class="top">Password* <input type="password" name="account_password" required id="password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$"
              autocomplete="password"></label>
          <p>Password must be at least 12 characters, include 1 capital letter, 1 number, and 1 special character</p>    
          <input type="submit" value="Register" class="submitBtn">
        </fieldset>
      </form>
  `; 
    return view
  }
/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util

