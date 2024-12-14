document.addEventListener('DOMContentLoaded', async () => {
    const doActionsAfterEnd = () => {
        document.dispatchEvent(new Event('fetchTasksLoaded'));
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }

    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage && JSON.parse(tasksFromStorage).length > 0) {
        doActionsAfterEnd();
        return;
    }

    const apiUrl = 'https://dummyjson.com/todos/random/10';

    const response = await fetch(apiUrl);

    if (!response.ok) {
        document.dispatchEvent(new Event('fetchTasksLoaded'));
        alert('Ошибка при загрузке задач:');
        return;
    }

    const data = await response.json();

    const tasks = data.map(todo => ({
        text: todo.todo,
        done: todo.completed
    }));

    localStorage.setItem('tasks', JSON.stringify(tasks));

    doActionsAfterEnd();
});
