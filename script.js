document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskIdInput = document.getElementById('taskIdInput');
    const searchResult = document.getElementById('searchResult');
    const tasks = [];

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const taskId = tasks.length + 1;
            const task = { id: taskId, text: taskText };
            tasks.push(task);

            addTaskToDOM(task);
            taskForm.reset();
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="editTask(${task.id})">Editar</button>
            <button onclick="removeTask(${task.id})">Remover</button>
        `;
        taskList.appendChild(li);
    }

    window.editTask = function (id) {
        const newText = prompt('Editar tarefa:', getTaskById(id).text);
        if (newText !== null) {
            const task = getTaskById(id);
            task.text = newText;
            updateTaskInDOM(task);
        }
    };

    window.removeTask = function (id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            removeTaskFromDOM(id);
        }
    };

    window.searchTaskById = function () {
        const idToSearch = parseInt(taskIdInput.value);
        const task = getTaskById(idToSearch);
        
        if (task) {
            searchResult.innerHTML = `ID: ${task.id}<br>Tarefa: ${task.text}`;
        } else {
            searchResult.innerHTML = 'Tarefa não encontrada.';
        }
    };

    function getTaskById(id) {
        return tasks.find(task => task.id === id);
    }

    function updateTaskInDOM(task) {
        const li = document.querySelector(`#taskList li:nth-child(${task.id})`);
        li.querySelector('span').textContent = task.text;
    }

    function removeTaskFromDOM(id) {
        const li = document.querySelector(`#taskList li:nth-child(${id})`);
        li.remove();
    }
});
