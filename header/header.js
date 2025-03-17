function goToStudents() {
    window.location.href = "/students/students.html";
}

function openMessages() {
    document.getElementById("notification-indicator").style.display = "none";
    window.location.href = "messages.html";
}

function showNotifications() {
    document.getElementById("notifications-popup").style.display = "block";
}

function hideNotifications() {
    document.getElementById("notifications-popup").style.display = "none";
}

function showProfileMenu() {
    document.getElementById("profile-menu").style.display = "block";
}

function hideProfileMenu() {
    document.getElementById("profile-menu").style.display = "none";
}

function redirectToMessages() {
    window.location.href = "/messages/messages.html";
}

let isBellActive = false;

function animatedBell() {
    const bellContainer = document.querySelector(".bell-container");
    const indicator = bellContainer.querySelector(".indicator");
    const solidBell = bellContainer.querySelector(".fa-solid");
    const regularBell = bellContainer.querySelector(".fa-regular");

    if (isBellActive) {
        bellContainer.classList.remove("active", "animate");
        indicator.style.display = "none";
        indicator.style.animation = "none"; 
        solidBell.style.animation = "none"; 
        void solidBell.offsetWidth; 
        regularBell.style.display = "block";
        solidBell.style.display = "none";
    } else {
        bellContainer.classList.add("active", "animate");
        indicator.style.display = "block";
        indicator.style.animation = "none";
        void indicator.offsetWidth; 
        indicator.style.animation = "growIndicator 0.5s ease-in-out forwards"; 
        
        regularBell.style.display = "none";
        solidBell.style.display = "block";
        setTimeout(() => {
            solidBell.style.animation = "none";
            void solidBell.offsetWidth;
            solidBell.style.animation = "keyframe-ring 0.5s ease-in-out";
        }, 50);
    }

    isBellActive = !isBellActive;
}







