const urlParticipants = 'https://mock-api.driven.com.br/api/v4/uol/participants' ;
const urlStatus = 'https://mock-api.driven.com.br/api/v4/uol/status '

const initialPage = document.querySelector(".initial-page");
const chatContent = document.querySelector(".chat-content");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-back");
const btnGetIn = document.querySelector(".get-in");
const btnMenu = document.querySelector(".btn-menu");

let users;
let currentUser;
let userStatus;

btnGetIn.addEventListener("click", () => {
    currentUser = document.querySelector(".user-name").value;
})

btnMenu.addEventListener("click", () => {
    modal.style.display = "flex";
})

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
})


function login(user){
    axios({
        method:'POST',
        url: urlParticipants,
        data:{ name: user }
    }).then((response) => {
        initialPage.style.display = "none";
        chatContent.style.display = "flex";
        getParticipants();

        document.querySelector("#chat").innerHTML += 
        `<div class="chat-news user-action">
            <p>
                <span class="timestamp">(09:21:45)</span>
                <span class="name">${currentUser}</span>
                <span class="message">
                    entra na sala...
                </span>
            </p> 
        </div>`

    }).catch((error) => {
        console.log(error)
    })
}

function getParticipants(){
    axios({
        method:'GET',
        url: urlParticipants,
    }).then((response) => {
        users = response.data
        console.log(response)
    })
}

function checkUser(user){
    axios({
        method:'GET',
        url: urlStatus,
        data: { name: user }
    }).then((response) => {
        users = response.data
        console.log(response)
    })
}