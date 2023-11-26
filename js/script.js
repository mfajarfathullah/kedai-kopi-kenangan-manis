// Toggle class active untuk hambrger menu
//perubahan navbar awalnya tidak ada jadi ada dan kebalikanya

const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger diklik... => artinya arrow function
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

//toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

//toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault(); //mematikan aksi defaultnya supaya saat klik tombol search diposisi manapun tidak akan sroll ke atas, ini biasa digunakan untuk submit form tapi tidak ingin kita lakukan
};

//klik diluar elemen untuk sidebar dan search
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button"); //sb= search button
const scb = document.querySelector("#shopping-cart-button"); //scb= search-cart-button

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!scb.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  } //jika diklik bukan tombol seacrh dan bukan form search, hilangkan class active. jika class active sudah hilang, maka form hilang
});

//Modal box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button"); //querySelectorAll = supaya semua elemen bisa digunakan

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

//klik tombol close Modal Box
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

//klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  } //jika kita klik diluar moodal-container, maka display none
};
