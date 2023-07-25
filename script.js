// SELECT ELEMENTS
const form = document.getElementById(("todoform"));
const todoInput = document.getElementById(("newtodo"));
const todoInputDate = document.getElementById(("myDate"));
const todosListEl = document.getElementById(("todos-list"));
const notificationEl = document.querySelector((".notification"));

// VARS
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

// 1st RENDER
renderTodos();

// FROM SUBMIT
form.addEventListener('submit', function (event){
    event.preventDefault();

   saveTodo();
   renderTodos();
   //localStorage.clear();
   localStorage.setItem('todos', JSON.stringify(todos))
});

// SAVE TODO
function saveTodo(){
    const todoValue = todoInput.value;
    const todoValueDate = todoInputDate.value;

    // check if the todo is empty
    const isEmpty = todoValue === '';

    //check for duplicate todos
    const isDuplicateValue =todos.some((todo) => (todo.value.toUpperCase() === todoValue.toUpperCase()));
    const isDuplicateDate =todos.some((todo) => (todo.date === todoValueDate));

    if(isEmpty){
        showNotification("Todo's input is empty");
    }
    else if(isDuplicateValue && EditTodoId < 0){
        showNotification("Todo already exists");
    }
    else{
        if(EditTodoId >= 0){
            todos = todos.map((todo, index) => {
                return {
                    color: todo.color,
                    checked: todo.checked,
                    value : index === EditTodoId ? todoValue : todo.value,
                    date : index === EditTodoId ? todoValueDate : todo.date,
                }
            })
            EditTodoId = -1;
        }
        else{
            todos.push({
                value: todoValue,
                date: todoValueDate,
                checked: false,
                color: '#' + (Math.floor (Math.random () * 16777215).toString (16))
            });
        }
    }
    todoInput.value = '';
    todoInputDate.value = '';
}

// RENDER TODOS
function renderTodos(){
    if(todos.length === 0){
        todosListEl.innerHTML = `<center class="no"><b>Nothing to do!</b></center>`;
        return;
    }

    todosListEl.innerHTML = '';
    todos.forEach((todo, index) => {
        todosListEl.innerHTML += `
        <div class="todo" id=${index}>
            <i 
                class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
                style="color : ${todo.color}"
                data-action="check"
            ></i>            
            <p class="bi ${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
            <p class="bi ${todo.checked ? 'checked' : ''}" data-action="check">${todo.date}</p>
            <i class="bi bi-pencil-square" data-action="edit"></i>
            <i class="bi bi-trash3-fill" data-action="delete"></i>
        </div>
        `;
    });
}


// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl.addEventListener('click', (event)=>{
    const target = event.target;
    const parentElement = target.parentNode;

    if(parentElement.className !== 'todo') return;

    const todo = parentElement;
    const todoId = Number(todo.id);

    const action = target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
});

// CHECK TODO

function checkTodo(todoId){
    // LASSÚ ÁTLÁTHATÓ
    todos = todos.map((todo, index) => {
        if(index === todoId){
            return{
                color: todo.color,
                value: todo.value,
                date: todo.date,
                checked: !todo.checked
            }
        }
        else{
            return{
                color: todo.color,
                value: todo.value,
                date: todo.date,
                checked: todo.checked
            }
        }
    });
    // RÖVID KOMPLEX
    /*todos = todos.map((todo, index) =>({
        ...todo,
        checked: index ===todoId ? !todo.checked : todo.checked
    }));*/
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos))
}

// EDIT A TODO
function editTodo(todoId){
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

// DELETE TODO
function deleteTodo(todoId){
    todos = todos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;

    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos))
}

// SHOW A NOTIFICATION
function showNotification(msg){
    notificationEl.innerHTML = msg;

    notificationEl.classList.add('notif-enter');

    setTimeout(() =>{
        notificationEl.classList.remove('notif-enter')
    }, 2000)
}

document.addEventListener('DOMContentLoaded', function () {
    const imageElement = document.getElementById('profile');
    const storedImageData = localStorage.getItem('uploadedImage');

    if (storedImageData) {
        imageElement.src = storedImageData;
    } else {
        imageElement.alt = 'Nincs kép';
    }
});

var showProfile = document.getElementById("profile");

// Lekérjük az adat-URI-t a local storage-ból "kep" kulcs alatt, és elmentjük egy változóba
var adatURI = localStorage.getItem("profileImage");
var element = document.getElementById("profile-image")
// Ellenőrizzük, hogy van-e értelmes adat-URI
if (adatURI && adatURI.startsWith("data:image/")) {
    // Ha igen, akkor beállítjuk az img elem forrását az adat-URI-ra, hogy megjelenítsük a képet
    element.style.cssText = "background: url('" + adatURI + "'); background-size: cover;\n" +
        "  width: 50px;\n" +
        "  height: 50px;\n" +
        "  border-radius: 100%;";
    //showProfile.src = adatURI;
} else {
    element.style.background = "url('img/blank-profile.png')";
    //showProfile.src = 'img/blank-profile.png';
}

var backgroundSet = localStorage.getItem("backgroundImage");
var backgroundElement = document.getElementById("header-background")
// Ellenőrizzük, hogy van-e értelmes adat-URI
if (backgroundSet && backgroundSet.startsWith("data:image/")) {
    // Ha igen, akkor beállítjuk az img elem forrását az adat-URI-ra, hogy megjelenítsük a képet
    backgroundElement.style.cssText = "background: url('" + backgroundSet + "'); background-size: cover;\n" +
        "  border-radius: 5px 5px 0 0;\n" +
        "  height: var(--header-height);\n" +
        "  width: 100%;";
    //showProfile.src = adatURI;
} else {
    backgroundElement.style.background = "url('img/blank-background.png')";
    //showProfile.src = 'img/blank-profile.png';
}

