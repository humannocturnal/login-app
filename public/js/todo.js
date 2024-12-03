const addTodoBtn = document.getElementById('addTodoBtn');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoCards = document.getElementById('todoCards');

let todos = [];
let editIndex = -1;

// Open modal
addTodoBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    todoInput.value = '';
    editIndex = -1;
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Add or edit todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoValue = todoInput.value.trim();

    if (!todoValue) return;

    if (editIndex === -1) {
        todos.push(todoValue);
    } else {
        todos[editIndex] = todoValue;
    }

    updateTodoCards();
    modal.style.display = 'none';
});

// Update todo cards
function updateTodoCards() {
    todoCards.innerHTML = '';
    todos.forEach((todo, index) => {
        const card = document.createElement('div');
        card.className = 'todo-card';
        card.innerHTML = `
            <h3>Todo</h3>
            <p>${todo}</p>
            <button class="btn edit" onclick="editTodo(${index})">Edit</button>
            <button class="btn delete" onclick="deleteTodo(${index})">Delete</button>
        `;
        todoCards.appendChild(card);
    });
}

// Edit todo
window.editTodo = (index) => {
    modal.style.display = 'flex';
    todoInput.value = todos[index];
    editIndex = index;
};

// Delete todo
window.deleteTodo = (index) => {
    todos.splice(index, 1);
    updateTodoCards();
};

// Close modal when clicking outside
window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};
