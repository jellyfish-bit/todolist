// Model Section
let todos = [];
const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)) {
    todos = savedTodos;
}
else {
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

function createTodo(pTitle, pDueDate) {
    var id = '' + new Date().getTime();
    todos.push({
        title: pTitle,
        dueDate: pDueDate,
        id: id,
        done: false
    });
    saveTodos();
}
function removeTodo(pIdToDelete) {
    //Filter return false to delete obj and true to keep it
    //Filter creates copy of array
    todos = todos.filter(function (todo) {
        if (todo.id === pIdToDelete) {
            return false;
        }
        else {
            return true;
        }
    });
    saveTodos();
}
function updateCheckedTodo(pIdToUpdate, pValue) {
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
    const todoItems = document.getElementById("list-items");
    todoItems.innerHTML = "";
    todos.forEach( (todo) => {
        const elementListItem = document.createElement('li');
        elementListItem.className = "todo-item";

        const elementCheckBox = document.createElement('input');
        elementCheckBox.type = "checkbox";
        elementCheckBox.className = "checkbox";
        elementCheckBox.onclick = checkBoxPressed;
        elementCheckBox.id = todo.id + "c";
        elementCheckBox.checked = todo.done;

        const elementTextSpan = document.createElement('span');
        elementTextSpan.innerText = todo.title;
        elementTextSpan.className = "todo-item-text";
        
        const elementDateSpan = document.createElement('span');
        elementDateSpan.innerText = " " + todo.dueDate;
        elementDateSpan.className = "todo-item-date";

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = deleteButtonPressed;
        deleteButton.id = todo.id;

        if (todo.done == true) {
            deleteButton.className = "delete-button delete-button-green";
        }
        else {
            deleteButton.className = "delete-button delete-button-red";
        }
        if(todo.dueDate !== "") {
            elementTextSpan.appendChild(elementDateSpan);
        }
        elementListItem.appendChild(elementCheckBox);
        elementListItem.appendChild(elementTextSpan);
        elementListItem.appendChild(deleteButton);
        todoItems.appendChild(elementListItem);
    });
}

// Controller Section
function addTodoButtonPressed() {
    const title = document.getElementById("todo-title").value;
    if(title === "") {
        return
    }
    const dueDate = document.getElementById("todo-date").value;
    createTodo(title, dueDate);
    render();
}
function deleteButtonPressed(event) {
    const deleteButtonEvent = event.target;
    const idToDelete = deleteButtonEvent.id;
    console.log(idToDelete);
    if(!document.getElementById(idToDelete + "c").checked) {
        return
    }
    removeTodo(idToDelete);
    render();
}
function checkBoxPressed(event) {
    const checkbox = event.target;
    const checkboxId = checkbox.id;
    console.log(checkboxId);
    updateCheckedTodo(checkboxId.slice(0, -1), checkbox.checked);
    render();
}
