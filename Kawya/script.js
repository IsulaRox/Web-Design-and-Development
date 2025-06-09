document.addEventListener("DOMContentLoaded", function() {
    var currentPage = window.location.pathname.split('/').pop(); 
    console.log("Current Page:", currentPage);

    var homeLink = document.getElementById('homeLink');
    var feedbackLink = document.getElementById('feedbackLink');

    if (currentPage === "Home.html" || currentPage === "") {
        homeLink.classList.add('active');
    } else if (currentPage === "Feedback.html") {
        feedbackLink.classList.add('active');
    } 
});
window.onload = function() {
    // Get the form and fieldset elements
    var form = document.getElementById('feedback-form');
    var fieldset = document.getElementById('form-fieldset');

    // Set the background size of the fieldset to match the size of the form
    fieldset.style.backgroundSize = form.offsetWidth + 'px ' + form.offsetHeight + 'px';
};
document.addEventListener("DOMContentLoaded", function() {
    // Get the feedback form element
    var feedbackForm = document.getElementById('feedback-form');

    // Add submit event listener to the form
    feedbackForm.addEventListener('submit', function(event) {
        // Prevent the form from submitting by default
        event.preventDefault();

        // Perform validation
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var visitRadioButtons = document.querySelectorAll('input[name="visit"]');
        var msgTextarea = document.getElementById('msg');
        var satisfactionRadioButtons = document.querySelectorAll('input[name="satisfaction"]');
        var recommendRadioButtons = document.querySelectorAll('input[name="recommond"]');
        var modeSelect = document.getElementById('mode');

        var isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            isValid = false;
            alert('Please enter your name.');
            nameInput.focus();
            return;
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            isValid = false;
            alert('Please enter your email.');
            emailInput.focus();
            return;
        } else if (!validateEmail(emailInput.value)) {
            isValid = false;
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        // Validate "Was this your first time visiting?"
        if (!isChecked(visitRadioButtons)) {
            isValid = false;
            alert('Please select whether this was your first time visiting.');
            return;
        }

        // Validate satisfaction rating
        if (!isChecked(satisfactionRadioButtons)) {
            isValid = false;
            alert('Please rate your satisfaction.');
            return;
        }

        // Validate recommendation
        if (!isChecked(recommendRadioButtons)) {
            isValid = false;
            alert('Please indicate if you would recommend our service.');
            return;
        }

        // Validate mode selection
        if (modeSelect.value === '') {
            isValid = false;
            alert('Please select a mode of communication.');
            modeSelect.focus();
            return;
        }

        // If form is valid, submit the form
        if (isValid) {
            feedbackForm.submit();
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Function to check if at least one radio button is checked
    function isChecked(radioButtons) {
        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return true;
            }
        }
        return false;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    var feedbackForm = document.getElementById('feedback-form');

    // Add submit event listener
    feedbackForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Reset form fields
        feedbackForm.reset();

        // Additional logic can be added here, such as sending the form data to a server
    });
});
emailjs.init("Opytpr0mO1jiWLqqE");

function sendFeedback(){
    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        visit: document.querySelector('input[name="visit"]:checked').value,
        satisfaction: document.querySelector('input[name="satisfaction"]:checked').value,
        recommond: document.querySelector('input[name="recommond"]:checked').value,
        mode: document.getElementById('mode').value,
        user_msg: document.getElementById('msg').value
    }
    emailjs.send("service_tsizhby", "template_na1kjye", formData)
        .then(function(response) {
            console.log("Email sent successfully", response);
            alert("Thank you for your feedback!");
            // Reset the form after successful submission
            document.getElementById("feedback-form").reset();
        }, function(error) {
            console.error("Error sending email", error);
            alert("Sorry, there was an error sending your feedback.");
        });
}
