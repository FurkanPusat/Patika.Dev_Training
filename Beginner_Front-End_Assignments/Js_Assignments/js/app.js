let newBtnElId = "liveToastBtn";
let taskInputElId = "task";
let todoListElId = "list";

let toastAddedToListId = "#toastAddedToList";
let toastErrorAddedToListId = "#toastErrorAddedToList";

let uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const INITIAL_TODO_LIST = [
  { id: uid(), body: "3 Litre Su İç" },
  { id: uid(), body: "Ödevleri Yap" },
  { id: uid(), body: "En Az 3 Saat Kodlama Yap" },
  { id: uid(), body: "Yemek Yap" },
  { id: uid(), body: "50 Sayfa Kitap Oku" },
];

let todoListArr = [];

let removeTodoFromTodoListArray = (id) => {
  let removeTodoItem = todoListArr.filter((todo) => {
    return todo.id !== id;
  });

  todoListArr = [...removeTodoItem];
  setTodoListToLocalStorage(todoListArr);
};

let removeTodoClicked = (todoEl) => {
  removeTodoFromTodoListArray(todoEl.id);
  todoEl.remove();
};

let listenTodoInput = () => {
  document.getElementById(taskInputElId).addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      newElement();
    }
  });
};

let todoClicked = (listItem) => {
  listItem.classList.toggle("checked");
};

let clearTaskInput = () => {
  let taskInputEl = document.getElementById(taskInputElId);
  taskInputEl.value = "";
};

let createTodoItem = ({ body, id }) => {
  let todoListEl = document.getElementById(todoListElId);

  let newTodoItemEl = document.createElement("li");
  let todoText = document.createTextNode(body);
  newTodoItemEl.id = id;
  newTodoItemEl.appendChild(todoText);

  let removeTodoBtnEl = document.createElement("span");
  removeTodoBtnEl.innerText = "x";
  removeTodoBtnEl.className = "close";
  removeTodoBtnEl.addEventListener("click", (e) =>
    removeTodoClicked(e.target.parentElement)
  );

  newTodoItemEl.appendChild(removeTodoBtnEl);

  newTodoItemEl.addEventListener("click", (e) => todoClicked(e.target));

  todoListEl.append(newTodoItemEl);
};

let newElement = () => {
  let todoListEl = document.getElementById(todoListElId);
  let taskInputEl = document.getElementById(taskInputElId);

  let todoVal = taskInputEl.value.trim();

  if (todoVal === "") {
    $(toastErrorAddedToListId).toast("show");

    clearTaskInput();
    taskInputEl.focus();

    return;
  }

  let newTodoItem = { id: uid(), body: todoVal };
  createTodoItem(newTodoItem);

  todoListArr.push(newTodoItem);

  setTodoListToLocalStorage(todoListArr);

  clearTaskInput();
  taskInputEl.focus();

  $(toastAddedToListId).toast("show");
};

let setTodoListToLocalStorage = (list) => {
  localStorage.setItem("TODOJS_STORAGE", JSON.stringify(list));
};

let getTodoListFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("TODOJS_STORAGE"));
};

let todoListFromStorage = getTodoListFromLocalStorage();

if (todoListFromStorage === null || todoListFromStorage.length < 1) {
  todoListArr = INITIAL_TODO_LIST;
  setTodoListToLocalStorage(todoListArr);
} else {
  todoListArr = todoListFromStorage;
}

todoListArr.forEach((todoItem) => {
  createTodoItem(todoItem);
});

listenTodoInput();