document.addEventListener('fetchTasksLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        if (todoList) todoList.innerHTML = '';
        if (doneList) doneList.innerHTML = '';

        const todoTasks = tasks.filter(task => !task.done);
        if (todoTasks.length === 0) {
            const message = document.createElement('em');
            message.textContent = 'Нет выполняемых задач.';
            todoList.appendChild(message);
        } else {
            todoTasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;
                todoList.appendChild(li);

                li.addEventListener('click', () => {
                    task.done = true;
                    saveTasks();
                    renderTasks();
                });
            });
        }

        const doneTasks = tasks.filter(task => task.done);
        if (doneTasks.length === 0) {
            const message = document.createElement('em');
            message.textContent = 'Нет выполненных задач.';
            doneList.appendChild(message);
        } else {
            doneTasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;
                doneList.appendChild(li);

                li.addEventListener('click', () => {
                    task.done = false;
                    saveTasks();
                    renderTasks();
                });
            });
        }
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    renderTasks();
});
