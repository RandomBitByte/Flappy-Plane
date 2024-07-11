document.addEventListener("DOMContentLoaded", function() {
    var message = document.getElementById("message");
    var downloadLink = document.getElementById("download-link");

    function isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    if (isAndroid()) {
        message.textContent = "Your device is compatible!";
        downloadLink.style.display = "inline-block";
    } else {
        message.textContent = "Sorry, this app is only available for Android devices.";
    }
});
