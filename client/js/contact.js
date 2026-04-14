// contact.js

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-message').value.trim();
    
    let isValid = true;

    // Validate Name
    if (!name) {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('email-error').style.display = 'none';
    }

    // Validate Message
    if (!msg) {
        document.getElementById('msg-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('msg-error').style.display = 'none';
    }

    if (isValid) {
        // Send data to backend or mock success
        document.getElementById('success-msg').style.display = 'block';
        this.reset();
        
        setTimeout(() => {
            document.getElementById('success-msg').style.display = 'none';
        }, 4000);
    }
});
