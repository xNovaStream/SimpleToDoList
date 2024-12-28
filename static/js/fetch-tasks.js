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

    const showAlert = (title, text, icon) => {
        Swal.fire({
            title,
            text,
            icon,
            customClass: {
                confirmButton: 'swal-button',
                popup: 'swal-popup',
                title: 'swal-title',
                content: 'swal-content',
            },
            buttonsStyling: false,
        });
    };

    const apiUrl = 'https://dummyjson.com/todos/random/10';

    const response = await fetch(apiUrl);

    if (!response.ok) {
        doActionsAfterEnd();
        showAlert('Ошибка', 'Не удалось загрузить задачи', 'error');
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
