//DOM elementlərinin seçilməsi
const taskInput = document.getElementById('taskInput');
const toggleInputBtn = document.getElementById('toggleInputBtn');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const ascIcon = document.getElementById('ascIcon');
const descIcon = document.getElementById('descIcon');
const sortIcon = document.getElementById('sortIcon');

//default parametrlər
taskInput.style.display = 'block';
taskList.style.display = 'none';

//Tapşırıqların saxlanması üçün array
let tasks = [];

//Tapşırıqların göstərilməsi və gizlənməsi
function toggleInputVisibility() {
    if (taskInput.style.display === 'none') {
        taskInput.style.display = 'block';
        taskInput.focus();
    } else {
        taskInput.style.display = 'none';
        taskInput.value = '';
    }
}

//Tapşırıqların əlavə edilməsi
function addTask(taskContent) {
    if (!taskContent.trim()) return;

    tasks.push(taskContent);

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskContent}</span>
        <button onclick="removeTask(this)" aria-label="Tapşırığı sil">
            <i class="fa-regular fa-circle-xmark"></i>
        </button>
    `;
    taskList.appendChild(listItem);
    taskInput.value = '';
    taskInput.style.display = 'none'; 
    updateTaskListVisibility();
}

//Tapşırıqların silinməsi
function removeTask(button) {
    const taskItem = button.parentElement;
    const taskContent = taskItem.querySelector('span').textContent;
    tasks = tasks.filter(task => task !== taskContent);
    taskItem.remove();
    updateTaskListVisibility();
}

//Tapşırıqların siyahısının görünürlüyünü yeniləyən funksiya
function updateTaskListVisibility() {
    if (tasks.length === 0) {
        taskInput.style.display = 'block';
        taskList.style.display = 'none';
    } else {
        taskList.style.display = 'block';
    }
}

//Tapşırıqların sıralanması(artan və ya azalan)
function sortTasks(order) {
    if (order === 'asc') {
        tasks.sort((a, b) => a.localeCompare(b));
        ascIcon.style.display = 'none';
        descIcon.style.display = 'inline-block';
    } else {
        tasks.sort((a, b) => b.localeCompare(a));
        ascIcon.style.display = 'inline-block';
        descIcon.style.display = 'none';
    }

    taskList.innerHTML = '';
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTask(this)" aria-label="Tapşırığı sil">
                <i class="fa-regular fa-circle-xmark"></i>
            </button>
        `;
        taskList.appendChild(listItem);
    });
}

sortIcon.addEventListener('click', () => {
    const currentOrder = ascIcon.style.display === 'none' ? 'desc' : 'asc';
    sortTasks(currentOrder);
});

toggleInputBtn.addEventListener('click', toggleInputVisibility);

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value.trim());
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value.trim());
    }
});

