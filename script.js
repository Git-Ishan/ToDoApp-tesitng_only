const STORAGE_KEY = "taskflow.todos.v1";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingText = document.querySelector("#remaining-text");
const allCount = document.querySelector("#all-count");
const activeCount = document.querySelector("#active-count");
const completedCount = document.querySelector("#completed-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const filters = [...document.querySelectorAll("[data-filter]")];

let currentFilter = "all";
let todos = loadTodos();

document.querySelector("#today-date").textContent = new Intl.DateTimeFormat("en", {
  weekday: "short", month: "short", day: "numeric"
}).format(new Date()).toUpperCase();
document.querySelector("#year").textContent = new Date().getFullYear();

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(item =>
      item && typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.completed === "boolean"
    ) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    remainingText.textContent = "Unable to save in this browser.";
  }
}

function render() {
  const active = todos.filter(todo => !todo.completed).length;
  const completed = todos.length - active;

  allCount.textContent = todos.length;
  activeCount.textContent = active;
  completedCount.textContent = completed;
  remainingText.textContent = active === 0
    ? "You're all caught up."
    : `${active} ${active === 1 ? "task" : "tasks"} left to go.`;

  filters.forEach(button => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  const visibleTodos = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  list.replaceChildren();
  visibleTodos.forEach(todo => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " done" : ""}`;

    const check = document.createElement("button");
    check.className = "check-button";
    check.type = "button";
    check.setAttribute("aria-label", todo.completed ? "Mark task active" : "Complete task");
    check.setAttribute("aria-pressed", String(todo.completed));
    const checkmark = document.createElement("span");
    checkmark.textContent = todo.completed ? "✓" : "";
    check.append(checkmark);
    check.addEventListener("click", () => {
      todos = todos.map(entry => entry.id === todo.id
        ? { ...entry, completed: !entry.completed }
        : entry);
      saveTodos();
      render();
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = todo.title;

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Delete ${todo.title}`);
    remove.addEventListener("click", () => {
      todos = todos.filter(entry => entry.id !== todo.id);
      saveTodos();
      render();
    });

    item.append(check, title, remove);
    list.append(item);
  });

  emptyState.classList.toggle("visible", visibleTodos.length === 0);
  if (todos.length === 0) {
    emptyState.querySelector("h3").textContent = "Nothing on your list yet";
    emptyState.querySelector("p").textContent = "Add a task above and take the first step.";
  } else if (visibleTodos.length === 0) {
    emptyState.querySelector("h3").textContent = "No tasks in this view";
    emptyState.querySelector("p").textContent = "Try another filter to see your tasks.";
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    input.focus();
    return;
  }
  todos.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    completed: false
  });
  input.value = "";
  currentFilter = "all";
  saveTodos();
  render();
  input.focus();
});

filters.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    render();
  });
});

clearCompletedButton.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  render();
});

render();
