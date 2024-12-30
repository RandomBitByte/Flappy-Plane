document.addEventListener("DOMContentLoaded", function () {
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

    const BIN_ID = "6772ed76acd3cb34a8c1b79f";
    const ACCESS_KEY = "$2a$10$8qZ5H8YL3.1Clb4RNrcl7u4nJsFxyrqqNRJbxKswuDKxOkyHDctm6";
    let visits = 0;
    let downloads = 0;
    incrementVariable("visits");


    async function updateData(data) {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Access-Key': ACCESS_KEY
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    async function fetchData() {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Access-Key': ACCESS_KEY }
        });

        const data = await response.json();
        return data.record;
    }

    async function incrementVariable(variableName) {
        let data = await fetchData();
        //let data = {"visits": 0, "downloads": 0};
        if (data[variableName] !== undefined) {
            data[variableName]++;
        } else {
            console.error(`Variable "${variableName}" does not exist.`);
            return;
        }
        visits = data["visits"];
        downloads = data["downloads"];
        console.log(visits, downloads);
        updateClientData(data);
        await updateData(data);
    }

    document.getElementById("download-link").addEventListener("click", function (event) {
        const downloadLink = event.target;
        const href = downloadLink.getAttribute("href");
        const a = document.createElement("a");
        a.href = href;
        a.setAttribute("download", downloadLink.getAttribute("download"));
        a.click();
        
        incrementVariable("downloads");
    });

    function updateClientData(data) {
        dcount = document.getElementById("count-downloads");
        dcount.textContent = data["downloads"];

        vcount = document.getElementById("count-visits");
        vcount.textContent = data["visits"];
    }

});
