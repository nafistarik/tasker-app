import { useState } from "react";
export default function AddTask({ onSave, taskToUpdate }) {
  const [task, setTask] = useState(
    taskToUpdate
      ? taskToUpdate
      : {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          tags: [],
          priority: "",
          isFavourite: false,
        }
  );

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null)); // taskToUpdate ? false : true

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tags") {
      setTask((prevTask) => ({
        ...prevTask,
        tags: value.split(","),
      }));
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the form from reloading the page
    onSave(task, isAdd);
    setIsAdd(null);
  };

  return (
    <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
      <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
        {isAdd ? "Add New Task" : "Edit Task"}
      </h2>

      <div className="space-y-9 text-white lg:space-y-10">
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="title">Title</label>
          <input
            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
            type="text"
            name="title"
            id="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
            type="text"
            name="description"
            id="description"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="tags">Tags</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="tags"
              id="tags"
              value={task.tags.join(", ")} // array to string
              onChange={handleChange} // string to array
              required
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="priority">Priority</label>
            <select
              className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
              name="priority"
              id="priority"
              value={task.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center lg:mt-20">
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
        >
          {isAdd ? "Add Task" : "Update Task"}
        </button>
      </div>
    </form>
  );
}
