const login = (user) => {
    axios({
        method:'POST',
        url: urlParticipants,
        data:{ name: user }
    }).then((response) => {
        initialPage.style.display = "none";
        chatContent.style.display = "flex";

        getParticipants();

        const date = new Date();
        document.querySelector("#chat").innerHTML += 
        `<div class="chat-news user-action">
            <p>
                <span class="timestamp">(${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})</span>
                <span class="name">${currentUser}</span>
                <span class="message">
                    entra na sala...
                </span>
            </p> 
        </div>`

        getMessages();
        // setInterval(()=> checkUser(currentUser), 5000)
        setInterval(()=> getMessages(), 3000)

    }).catch((error) => {
        console.log(error)
    })
};

export { login }