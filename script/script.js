const urlParticipants = 'https://mock-api.driven.com.br/api/v4/uol/participants' ;
const urlStatus = 'https://mock-api.driven.com.br/api/v4/uol/status';
const urlMessages = 'https://mock-api.driven.com.br/api/v4/uol/messages';

const initialPage = document.querySelector(".initial-page");
const chatContent = document.querySelector(".chat-content");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-back");
const btnGetIn = document.querySelector(".get-in");
const btnMenu = document.querySelector(".btn-menu");
const inputChat = document.querySelector(".input-chat");
const btnChat = document.querySelector(".btn-chat");

let users;
let currentUser;

btnGetIn.addEventListener("click", async () => {
    currentUser = document.querySelector(".user-name").value;
    login(currentUser);    
});

btnMenu.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

btnChat.addEventListener('click', () => {
    sendMessage();
})


const login = (user) => {
    axios({
        method:'POST',
        url: urlParticipants,
        data:{ name: user }
    }).then((response) => {
        console.log(response);
        initialPage.style.display = "none";
        chatContent.style.display = "flex";
        getParticipants();
        getMessages();
        setInterval(()=> checkUser(currentUser), 5000)
    }).catch((error) => {
        console.log(error)
    })
};

const checkUser = (user) => {
    axios({
        method:'POST',
        url: urlStatus,
        data: { name: user }
    }).then((response) => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
};

const getParticipants = () =>{
    axios({
        method:'GET',
        url: urlParticipants
    }).then((response) => {
        (response.data).forEach(user => {
            document.querySelector(".online-users").innerHTML +=   `<div>
                                                                        <ion-icon name="person-circle-sharp"></ion-icon>
                                                                        <span class="contact">${user.name}</span>
                                                                        <img src="assets/check.svg" class="check">
                                                                    </div>`;
        })
        setInterval(()=> getMessages(), 3000);
    })
};

const sendMessage = () => {
    axios({
        method: "POST",
        url: urlMessages,
        data: {
            from: currentUser,
            to: 'Todos',
            text: inputChat.value,
            type: "message"
        }
    }).then(response => {
        inputChat.value = "";
        getMessages();
    }).catch(error => {
        console.log(error)
    })
}

const getMessages = () => {
    axios({
        method:'GET',
        url: urlMessages
    }).then((response) => {
        (response.data).forEach((action) => {
            document.querySelector("#chat").insertAdjacentHTML( 'beforeend' , typeOfMessage(action))
        })
        let data = document.querySelectorAll(".chat-news");
        data[data.length - 1].scrollIntoView()
    }).catch(error => {
        console.log(error);
    })
}

const typeOfMessage = (action) => {
    const messages = {
    'status': `<div class="chat-news user-action">
                        <p>
                            <span class="timestamp">(${action.time})</span>
                            <span class="name">${action.from}</span>
                            <span class="message">
                                ${action.text}
                            </span>
                        </p> 
                </div>`,
    'message': `<div class="chat-news user-message">
                        <p>
                            <span class="timestamp">(${action.time})</span>
                            <span class="name">${action.from}</span>
                            <span class="message">to</span>
                            <span class="name">${action.to}</span>:
                            <span class="message">
                                ${action.text}
                            </span>
                        </p> 
                </div>`,
    'private-message': `<div class="chat-news user-message private">
                            <p>
                                <span class="timestamp">(${action.time})</span>
                                <span class="name">${action.from}</span>
                                <span class="message">responde reservadamente para</span>
                                <span class="name">${action.to}</span>:
                                <span class="message">
                                    ${action.text}
                                </span>
                            </p> 
                        </div>`,
    }
    return messages[action.type]
}
