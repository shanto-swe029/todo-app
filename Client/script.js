// SELECT ELEMENTS
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListEl = document.getElementById("todos-list");

// VARS
let todos=[];

// FORM SUBMISSION
form.addEventListener('submit', function(event) {
    event.preventDefault();

    saveTodo();
    renderTodos();
});

// SAVE TODO
function saveTodo() {
    const todoValue = todoInput.value;

    // check if the todo is empty
    const isEmpty = todoValue === '';

    //check for duplicate todos
    const isDuplicate = todos.some( (todo) => todo.value.toUpperCase() === todoValue.toUpperCase() );

    if( isEmpty ) {
        alert("Todo's input is empty");
    }
    else if( isDuplicate ) {
        alert("This todo already exists");
    }
    else {
        const todo = {
            value : todoValue,
            checked : false,
            color : '#' + Math.floor(Math.random()*16777215).toString(16)
        }
    
        todos.push(todo);
        todoInput.value = '';
    }
}

// RENDER TODOS
function renderTodos() {
    todosListEl.innerHTML = ``;
    todos.forEach((todo, index) => {
        todosListEl.innerHTML += `
            <div class="todo" id= ${index}>
                <img 
                    src="${todo.checked ? 'img/circle-marked.png' : 'img/circle-unmarked.png'}" 
                    class="img-icon-small"
                    data-action="check">
                <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
                <img src="img/edit.png" 
                    class="img-icon-small"
                    data-action="edit">
                <img src="img/trash-red.png" 
                    class="img-icon-small"
                    data-action="delete">
            </div>
        `
    })
}

// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentElement;

    if( parentElement.className !== 'todo' ) return;

    // TODO ID
    const todo = parentElement;
    const todoId = Number(todo.id);

    // Target Action
    const action = target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
});

// CHECK A TODO
