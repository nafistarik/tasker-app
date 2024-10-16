import { useState } from "react";
import AddTask from "./AddTask";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Task 3",
    description: "Lorem ipsum dolor sit amet",
    tags: ["efwf", "te3ty", "hrh"],
    priority: "High",
    isFavourite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTaskModal = () => {
    setShowAddTaskModal(true);
  };

  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks((tasks) => [...tasks, newTask]);
    } else {
      setTasks((tasks) =>
        tasks.map((task) => (task.id === newTask.id ? newTask : task))
      );
    }
    setShowAddTaskModal(false);
    setTaskToUpdate(null);
  };

  const handleEditTask = (editTask) => {
    setTaskToUpdate(editTask);
    setShowAddTaskModal(true);
  };

  const handleDeleteTask = (deleteTask) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== deleteTask.id));
  };

  const handleDeleteAllTask = () => {
    setTasks([]);
  };

  const toggleFavorite = (task) => {
    setTasks((tasks) =>
      tasks.map((t) => {
        return t.id === task.id ? { ...t, isFavourite: !t.isFavourite } : t;
      })
    );
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddTaskModal ? (
        <AddTask onSave={handleAddTask} taskToUpdate={taskToUpdate} />
      ) : null}

      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onHandleAddTaskModal={handleAddTaskModal}
            onDeleteAll={handleDeleteAllTask}
          />
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onFavourite={toggleFavorite}
          />
        </div>
      </div>
    </section>
  );
}
