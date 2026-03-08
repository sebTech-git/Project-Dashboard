document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (user === "admin" && pass === "1234") {
        message.innerText = "Success! Redirecting...";
        message.style.color = "#2ecc71"; 
        
        setTimeout(() => {
            window.location.href = "../html/tacodashboard.html";
        }, 800);
    } else {
        message.innerText = "Invalid credentials!";
        message.style.color = "#ff6b35"; 
        
        const card = document.querySelector('.login-card');
        card.style.animation = 'none';
        void card.offsetWidth; 
        card.style.animation = 'shake 0.4s';
    }
});