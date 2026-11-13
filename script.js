const todoForm = document.querySelector('form')
const todoInput = document.getElementById('todo-input')
const todoListUL = document.getElementById('todo-list')

let allTodos = getTodos();
updateTodoList()

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();    
        todoInput.value = "";        
    }
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) =>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI= document.createElement("li")
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id=${todoId}>
        <label for=${todoId} class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="transparent"><path d="M9.55,18l-5.7-5.7l1.43-1.42l4.28,4.28l9.18-9.18L20.15,7.4L9.55,18Z"/></svg>
        </label>
        <label for=${todoId} class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="var(--secondary-color)"><path d="M7,21q-0.82,0-1.41-0.59T5,19V6H4V4H9V3h6V4h5V6H19V19q0,0.82-0.59,1.41T17,21H7ZM17,6H7V19H17V6ZM9,17h2V8H9v9Zm4,0h2V8H13v9ZM7,6V19V6Z"/></svg>
        </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button")
    deleteButton.addEventListener("click", () =>{
        deleteTodoItems(todoIndex);
    })
    const checkBox = todoLI.querySelector("input");
    checkBox.addEventListener("change", () =>{
        allTodos[todoIndex].completed = checkBox.checked;
        saveTodos()
    })
    checkBox.checked = todo.completed
    return todoLI;
}
function deleteTodoItems(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();

}
function saveTodos(){
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos",todoJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
