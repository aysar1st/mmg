const validUser = { username: "mmg", password: "mmg" };

function handleLogin() {
    const user = document.getElementById("usernameInput").value;
    const pass = document.getElementById("passwordInput").value;
    const msg = document.getElementById("loginMsg");

    if (user === validUser.username && pass === validUser.password) {
        msg.style.color = "#00ff00";
        msg.innerText = "نجح الدخول..";
        localStorage.setItem("currentUser", user);
        
        setTimeout(() => {
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("chooseSection").style.display = "block";
            document.getElementById("userHello").innerText = user;
        }, 800);
    } else {
        msg.innerText = "الرمز أو الاسم خطأ!";
    }
}

function startChat(type) {
    document.getElementById("chooseSection").style.display = "none";
    document.getElementById("chatSection").style.display = "flex";
    document.getElementById("roomTypeDisplay").innerText = type;
}

function handleSendMessage() {
    const input = document.getElementById("messageInput");
    const container = document.getElementById("messages");

    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `<b style="color:#00d2ff">أنت:</b> ${input.value}`;
        container.appendChild(li);
        input.value = "";
        // النزول لآخر رسالة تلقائياً
        document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight;
    }
}
