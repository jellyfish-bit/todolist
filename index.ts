// Model Section
let todos: TodoItem[];

const savedTodos: string = JSON.parse(<string>localStorage.getItem('todos'));

class TodoItem {
  public title: string;
  public dueDate: string;
  public id: string;
  public done: boolean;
}

if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [{
    title: 'Get Groceries',
    dueDate: '2023-10-04',
    id: 'id1',
    done: false
  },
  {
    title: 'Wash Car',
    dueDate: '2023-10-04',
    id: 'id2',
    done: false
  },
  {
    title: 'Make Dinner ',
    dueDate: '2023-10-04',
    id: 'id3',
    done: false
  }];
}

//Initial Render of Todo items
render();

function createTodo(pTitle: string, pDueDate: string) {
  const id = '' + new Date().getTime();

  todos.push({
    title: pTitle,
    dueDate: pDueDate,
    id: id,
    done: false
  });
  saveTodos();
}
function removeTodo(pIdToDelete: string) {
  //Filter return false to delete obj and true to keep it
  //Filter creates copy of array
  todos = todos.filter(function (todo) {
    if (todo.id === pIdToDelete) {
      return false;
    } else {
      return true;
    }
  });
  saveTodos();
}
function removeFinishedTodos() {
  todos = todos.filter(function (todo) {
    return !todo.done;
  });
  saveTodos();
}
function updateCheckedTodo(pIdToUpdate: string, pValue: boolean) {
  todos.forEach(function (todo) {
    if (todo.id === pIdToUpdate) {
      todo.done = pValue;
    }
  });
  saveTodos();
}
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}


// View Section
function render() {
  const todoItems = document.getElementById("list-items")!;
  todoItems.innerHTML = "";
  todos.forEach((todo) => {
      const elementListItem = document.createElement('li');
      elementListItem.className = "todo-item";

      const elementCheckBox = document.createElement('input');
      elementCheckBox.type = "checkbox";
      elementCheckBox.className = "checkbox";
      elementCheckBox.onclick = checkBoxPressed;
      elementCheckBox.id = todo.id + "c";
      elementCheckBox.checked = todo.done;

      const elementTextSpan = document.createElement('span');
      elementTextSpan.innerText = todo.title!;
      elementTextSpan.className = "todo-item-text";

      const elementDateSpan = document.createElement('span');

      const dateDay = convertMsToDays(new Date(<string>todo.dueDate).getTime());
      const dateNowDay = convertMsToDays(Date.now());
      elementDateSpan.innerText = " " + todo.dueDate;
      elementDateSpan.className = "todo-item-date";
      if (dateDay < dateNowDay) {
          elementDateSpan.style.color = "red"
      } else if (dateDay === dateNowDay) {
          elementDateSpan.style.color = "gray"
      } else {
          elementDateSpan.style.color = "green"
      }
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.onclick = deleteButtonPressed;
      deleteButton.id = todo.id;

      if (todo.done == true) {
          deleteButton.className = "delete-button delete-button-green";
      } else {
          deleteButton.className = "delete-button delete-button-red";
      }
      elementListItem.title = "No due date set";

      if (todo.dueDate !== "") {
          elementTextSpan.appendChild(elementDateSpan);
          if (dateDay - dateNowDay === 0) {
              elementListItem.title = "Due today";
          } else if (dateDay - dateNowDay > 0) {
              elementListItem.title = "Due in " + (dateDay - dateNowDay) + " days";
          } else {
              elementListItem.title = "Was due " + (dateNowDay - dateDay) + " days ago";
          }
      }
      elementListItem.appendChild(elementCheckBox);
      elementListItem.appendChild(elementTextSpan);
      elementListItem.appendChild(deleteButton);
      todoItems.appendChild(elementListItem);
  });
}

// Controller Section
//Add todo button predd
function addTodoButtonPressed() {
  const textBox = <HTMLInputElement>document.getElementById("todo-title");
  const title = textBox.value;
  const datePicker = <HTMLInputElement>document.getElementById("todo-date");
  const dueDate = datePicker.value;

  createTodo(title, dueDate);

  render();

};
//On delete button click
function deleteButtonPressed(event: Event) {
  const deleteButtonEvent = <HTMLElement>event.target;
  const idToDelete = deleteButtonEvent.id;
  removeTodo(idToDelete);

  render();
}

function checkBoxPressed(event: Event) {
  const checkbox = <HTMLInputElement>event.target;
  const checkboxId = checkbox.id;
  updateCheckedTodo(checkboxId.slice(0, -1), checkbox.checked);
  render();
}
function deleteAllButtonPressed() {
  removeFinishedTodos();
  render();
}

// Helper Method
function convertMsToDays(pDate: number) {
  return Math.floor(pDate / 86400000)
}





