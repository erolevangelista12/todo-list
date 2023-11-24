const todoList = document.querySelector("#todo-list");
const newTodoInput = document.querySelector("#new-todo");
const addTodoButton = document.querySelector("#add-todo-button");

// Create a todo item
function createTodoItem(text) {
  const todoItem = document.createElement("li");
  todoItem.textContent = text;

  // Add a checkbox to the todo item
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  todoItem.appendChild(checkbox);

  // Add a delete button to the todo item
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  todoItem.appendChild(deleteButton);

  // Add the todo item to the to-do list
  todoList.appendChild(todoItem);

  // Add an event listener to the delete button
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(todoItem);
  });

  // Add an event listener to the checkbox
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      todoItem.classList.add("completed");
    } else {
      todoItem.classList.remove("completed");
    }
  });
}

// Add a new todo item
addTodoButton.addEventListener("click", () => {
  const text = newTodoInput.value;
  if (text) {
    createTodoItem(text);
    newTodoInput.value = "";
  }
});

// Load the to-do list from local storage
if (localStorage.getItem("todo-list")) {
  const todoListItems = JSON.parse(localStorage.getItem("todo-list"));
  for (const todoItem of todoListItems) {
    createTodoItem(todoItem.text);
  }
}

// Save the to-do list to local storage
window.addEventListener("beforeunload", () => {
  const todoListItems = [];
  const todoListElements = todoList.querySelectorAll("li");
  for (const todoListElement of todoListElements) {
    todoListItems.push({
      text: todoListElement.textContent,
      completed: todoListElement.classList.contains("completed"),
    });
  }

  localStorage.setItem("todo-list", JSON.stringify(todoListItems));
});
