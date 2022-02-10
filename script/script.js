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
let userStatus = false;

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

const checkUser = (user) => {
    axios({
        method:'POST',
        url: urlStatus,
        data: { name: user }
    }).then((response) => {
        console.log(response)
    }).catch(error => {
        currentUser = null;
        initialPage.style.display = "none";
        chatContent.style.display = "flex";
    })
};

const getParticipants = () =>{
    axios({
        method:'GET',
        url: urlParticipants
    }).then((response) => {
        users = response.data
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
        console.log(response);
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
        (response.data).forEach((action, index) => {
            document.querySelector("#chat").insertAdjacentHTML( 'afterbegin' , typeOfMessage(action))
            // document.querySelector(".chat-news").scrollIntoView();

        })
    }).catch(error => {
        console.log(error);
    })
}

const typeOfMessage = (action) => {
    switch(action.type) {
        case 'status':
            return `<div class="chat-news user-action">
                        <p>
                            <span class="timestamp">(${action.time})</span>
                            <span class="name">${action.from}</span>
                            <span class="message">
                                ${action.text}
                            </span>
                        </p> 
                    </div>`
        case 'message':
            return `<div class="chat-news user-message">
                        <p>
                            <span class="timestamp">(${action.time})</span>
                            <span class="name">${action.from}</span>
                            <span class="message">to</span>
                            <span class="name">${action.to}</span>:
                            <span class="message">
                            ${action.text}
                            </span>
                        </p> 
                    </div>`
    }
}

