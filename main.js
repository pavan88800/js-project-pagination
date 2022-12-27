import API from "./utils.js";
let URL = "https://jsonplaceholder.typicode.com/posts";
let User = await API(URL);
let paginationContainer = document.querySelector(".paginationContainer");
let countPerPage = document.getElementById("countPerPage");
let state = {
  page: 1,
  DATA: User,
};
displayCount();
if (
  document.readyState === "loading" ||
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  UserList();
} else {
  document.addEventListener("DOMContentLoaded", UserList);
}

function UserList() {
  paginationContainer.innerHTML = "";
  state.DATA.slice(state.page * 10 - 10, state.page * 10).forEach((el) => {
    return displayPage(el);
  });
}

function displayPage(el) {
  let fragement = document.createDocumentFragment();
  let ul = document.createElement("ul");
  ul.className = "unorderList";
  let li = document.createElement("li");
  li.innerHTML = ` ${el.id} ` + el.title;
  ul.appendChild(li);
  fragement.appendChild(ul);
  paginationContainer.appendChild(fragement);
}

function displayCount() {
  [...Array(state.DATA.length / 10)].map((_, index) => {
    let button = document.createElement("button");
    button.innerHTML = index + 1;
    button.id = "c";
    button.setAttribute("data-id", index + 1);
    state.page === index + 1 ? button.classList.add("active") : "";
    countPerPage.appendChild(button);
    button.onclick = () => getCount(index + 1);
  });
}

// previous state
let prev = document.getElementById("prev");
prev.addEventListener("click", () => {
  if (state.page > 1) {
    countPerPage.innerHTML = "";
    state.page -= 1;
    UserList();
    displayCount();
  }
});

// Next state
let next = document.getElementById("next");
next.addEventListener("click", () => {
  if (state.page < state.DATA.length / 10) {
    countPerPage.innerHTML = "";
    state.page += 1;
    UserList();
    displayCount();
  }
});
function getCount(idx) {
  countPerPage.innerHTML = "";
  state.page = idx;
  UserList();
  displayCount();
}
