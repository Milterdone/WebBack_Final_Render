document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const tasksContainer = document.getElementById('tasksContainer');

  // Fetch tasks from the DB and render cards
  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const tasks = await res.json();
      renderTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  // Rendering card elements with buttons
  function renderTasks(tasks) {
    tasksContainer.innerHTML = '';
    if (tasks.length === 0) {
      tasksContainer.innerHTML = '<p>No tasks available.</p>';
      return;
    }
    tasks.forEach(task => {
      const taskCard = document.createElement('div');
      taskCard.className = 'card task-card';
      taskCard.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description ? task.description : ''}</p>
        <p>Status: <span class="status">${task.status}</span></p>
        <p>Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
        <div class="task-actions">
          <button class="toggle-status" data-id="${task._id}" data-status="${task.status}">
            ${task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
          </button>
          <button class="delete-task" data-id="${task._id}">Delete Task</button>
        </div>
      `;
      tasksContainer.appendChild(taskCard);
    });

    // Event listener: toggle status
    document.querySelectorAll('.toggle-status').forEach(button => {
      button.addEventListener('click', async (e) => {
        const taskId = e.target.getAttribute('data-id');
        const currentStatus = e.target.getAttribute('data-status');
        await updateTaskStatus(taskId, currentStatus);
      });
    });

    // Event listener: delete
    document.querySelectorAll('.delete-task').forEach(button => {
      button.addEventListener('click', async (e) => {
        const taskId = e.target.getAttribute('data-id');
        await deleteTask(taskId);
      });
    });
  }

  // Handle form submission to create a new task
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate })
      });
      if (!res.ok) throw new Error('Failed to create task');
      taskForm.reset();
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  });

  // Update a task's status (toggle between pending and completed)
  async function updateTaskStatus(taskId, currentStatus) {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update task');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a task
  async function deleteTask(taskId) {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  // Initial fetch on page load
  fetchTasks();
});
