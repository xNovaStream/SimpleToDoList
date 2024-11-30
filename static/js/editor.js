document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-name');
    const taskSelector = document.getElementById('task-drop-list');
    const addTaskButton = document.getElementById('editor__add-task');
    const deleteTaskButton = document.getElementById('editor__delete-task');
    const editTaskButton = document.getElementById('editor__edit-task');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTaskSelector = () => {
        if (taskSelector) {
            taskSelector.innerHTML = '';
            taskSelector.className = "drop-list";

            if (tasks.length === 0) {
                const placeholderOption = document.createElement('option');
                placeholderOption.textContent = 'Нет задач';
                placeholderOption.disabled = true;
                placeholderOption.selected = true;
                taskSelector.appendChild(placeholderOption);
                taskSelector.classList.add('placeholder-font-style');
            } else {
                tasks.forEach((task, index) => {
                    const option = document.createElement('option');
                    option.value = index.toString();
                    option.textContent = task.text;
                    taskSelector.appendChild(option);
                });
            }
        }
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            const text = taskInput?.value.trim();
            if (text) {
                tasks.push({ text, done: false });
                taskInput.value = ''; // Очистить поле ввода
                saveTasks();
                renderTaskSelector();
            } else {
                alert("Введите текст задачи.");
            }
        });
    }

    if (deleteTaskButton) {
        deleteTaskButton.addEventListener('click', () => {
            const index = taskSelector?.value;
            if (index !== null && index !== "") {
                tasks.splice(index, 1);
                saveTasks();
                renderTaskSelector();
            } else {
                alert("Выберите задачу для удаления.");
            }
        });
    }

    if (editTaskButton) {
        editTaskButton.addEventListener('click', () => {
            const index = taskSelector?.value;
            const newText = taskInput?.value.trim();
            if (index !== null && index !== "" && newText) {
                tasks[index].text = newText;
                taskInput.value = '';
                saveTasks();
                renderTaskSelector();
            } else {
                alert("Выберите задачу и введите новый текст.");
            }
        });
    }

    renderTaskSelector();
});
