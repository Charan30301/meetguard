console.log("MeetGuard extension loaded!");

const button = document.createElement("button");

button.textContent = "🤖 MeetGuard";

button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.zIndex = "999999";
button.style.padding = "12px 18px";
button.style.border = "none";
button.style.borderRadius = "8px";
button.style.cursor = "pointer";

button.addEventListener("click", async () => {

    try {

        const response = await fetch("http://localhost:3000/api/test", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: "Hello from Google Meet!"
            })
        });

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        console.error("MeetGuard error:", error);

        alert("Could not connect to MeetGuard backend.");

    }

});

document.body.appendChild(button);