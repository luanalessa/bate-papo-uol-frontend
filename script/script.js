const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-back");
const menu = document.querySelector(".menu")
const btnMenu = document.querySelector(".btn-menu");

btnMenu.addEventListener("click", () =>{
    modal.style.display = "flex";
})

closeModal.addEventListener("click", () =>{
    modal.style.display = "none";
})
