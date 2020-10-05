var company_name = document.getElementById('company_name');
company_name.oninvalid = function(event) {
    event.target.setCustomValidity('Company Name should be between 3 to 25 chracters. e.g. abc Company');
}

var company_address = document.getElementById('company_address');
company_address.oninvalid = function(event) {
    event.target.setCustomValidity('Company Address should');
}