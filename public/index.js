var login_modal = document.getElementById('login_modal');
var signup_modal = document.getElementById('signup_modal');
var login = document.getElementById('login');
var signup = document.getElementById('signup');
var button_container = document.getElementById('button_container');

console.log(button_container)

login_modal.addEventListener('click', function(event) {
    button_container.classList.toggle("hidden");
    login.style.display = "block";
});

signup_modal.addEventListener('click', function(event) {
    button_container.classList.toggle("hidden");
    signup.classList.toggle("hidden");
});